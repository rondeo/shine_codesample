require 'securerandom'

module Api
  module V1
    class LessonsController < ApiController
      before_action :authenticate_api_v1_user!
      before_action :authorize_parent, only: [:update_status]

      def index
        if params[:learner_id].present?
          lessons = current_api_v1_user
            .lessons
            .where(learner_id: params[:learner_id])
            .order('created_at DESC')

          render json: { lessons: lessons.map(&:lesson_json), latest_lesson: lessons.first.lesson_json }
        else
          lessons = current_api_v1_user
            .lessons
            .order('created_at DESC')
            .group_by(&:learner_id)

          students = []

          lessons.each do |key, value|
            lesson = {}
            lesson[:user] = User.find(key).profile_json
            lesson[:lesson_count] = value.count
            lesson[:summary] = value.first.summary
            lesson[:subject] = current_api_v1_user.subject
            lesson[:latest_lesson] = value[0].lesson_json
            lesson[:lessons] = value.map(&:lesson_json)
            students << lesson
          end

          render json: students
        end
      end

      def tutors
        if params[:tutor_id].present?
          lessons = current_api_v1_user
                    .lessons.where(tutor_id: params[:tutor_id])
                    .order('created_at DESC')
          render json: { lessons: lessons.map(&:lesson_json), latest_lesson: lessons.first.lesson_json }
        else
          lessons = current_api_v1_user.lessons.order('created_at DESC').group_by(&:tutor_id)
          tutors = []

          lessons.each do |key, value|
            lesson = {}
            lesson[:user] = User.find(key).profile_json
            lesson[:lesson_count] = value.count
            lesson[:summary] = value.first.summary
            lesson[:latest_lesson] = value[0].lesson_json
            lesson[:lessons] = value.map(&:lesson_json)
            tutors << lesson
          end

          render json: tutors
        end
      end

      def parents
        learner_ids = current_api_v1_user
                      .students
                      .select { |hr| hr.learner.without_failed_charge? }
                      .pluck(:learner_id)
        learners = Learner.where(id: learner_ids).where('stripe_token_id IS NOT NULL')
        render status: 200, json: {
          message: 'Users found',
          parents: learners.map(&:mini_profile_json)
        }
      end

      def create
        lesson = Lesson.new(lesson_params)
        lesson.payment_status = Lesson.payment_statuses[:unpaid]
        lesson.tutor_id = current_api_v1_user.id
        if lesson.save
          # lesson.charge_parent
          # lesson.payout_to_tutor
          render json: lesson
        else
          render json: lesson.errors, status: 422
          return
        end
      end

      def update_status
        if params[:status] == 'approved'
          @lesson.update_attributes(
            status: Lesson.statuses[:approved],
            rating: params[:rating],
            private_feedback: params[:private_feedback]
          )

          #TODO - Move it to delayed job
          @lesson.charge_parent

          if params[:message].present?
            message = Message.new
            message.conversation_id = Conversation.fetch_conversation(current_user.id, @lesson.tutor_id).id
            message.user_id = current_user.id
            message.content = params[:message]
            message.save
          end

          data = { lesson_count: @lesson.tutor.lesson_count.to_i + 1 }
          data[:up_rating_count] = @lesson.tutor.up_rating_count.to_i + 1 if params[:rating] == 'up'
          @lesson.tutor.update_attributes(data)
        else
          @lesson.update_attributes(status: Lesson.statuses[:rejected])
          SendLessonRejectedEmailJob.perform_later(@lesson.id)
        end
        lessons = current_api_v1_user
                  .lessons.where(tutor_id: @lesson.tutor_id)
                  .order('created_at DESC')
        render json: { lessons: lessons.map(&:lesson_json), latest_lesson: lessons.first.lesson_json }
      end

      def refund
        paid_charge = @lesson.charges.credit.success.first

        if paid_charge.present?
          begin
            response = Stripe::Refund.create(charge: paid_charge.stripe_reference,
                                             reverse_transfer: true)
            charge = {
              lesson_id: @lesson.id,
              amount: @lesson.chargeable_amount,
              txn_type: Charge.txn_types[:refund],
              hours: @lesson.hours,
              price_per_hour: @lesson.price_per_hours
            }

            if response.present? && response.status == 'succeeded'
              charge[:status] = Charge.statuses[:success]
              charge[:stripe_reference] = response.id
            else
              charge[:status] = Charge.statuses[:failed]
              charge[:failure_code] = response.failure_code
              charge[:failure_message] = response.failure_message
            end
            charge = Charge.new(charge)
            charge.save!

            if charge.success?
              @lesson.update_attribute(:payment_status, Lesson.payment_statuses[:refund])
            end

            lessons = current_api_v1_user.lessons.where(tutor_id: params[:tutor_id]).order('created_at DESC')
            render json: lessons.map(&:lesson_json)
          rescue
            render(status: 422, json: { message: 'Unable to initiate refund. please try after some time.' }) && (return)
          end
        else
          render(status: 401, json: { message: 'You are not authorized to intiate the refund' }) && return
        end
      end

      private

      def authorize_parent
        @lesson = Lesson.find(params[:id])

        if @lesson.blank? || !current_api_v1_user.is_a?(Learner) || @lesson.learner != current_api_v1_user
          render(status: 401, json: { message: 'You are not authorized to intiate the refund' }) && return
        elsif !@lesson.pending?
          render(status: 401, json: { message: 'Looks like lesson status already updated' }) && return
        end
      end

      def lesson_params
        params.require(:lesson).permit(:tutor_id,
                                       :learner_id,
                                       :lesson_date,
                                       :hours,
                                       :summary,
                                       :minutes,
                                       :subject,
                                       :minutes,
                                       :rating)
      end
    end
  end
end
