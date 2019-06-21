module API
  module V1
    class PostingsController < ApiController
      def index
        # redirect_to root_path unless current_user && current_user.admin?

        @postings = Posting.order('postings.created_at DESC')
      end

      def create
        @posting = Posting.new(posting_params)

        if @posting.save
          render json: @posting
        else
          render json: @posting.errors, status: 422
        end
      end

      private

      def posting_params
        params
          .require(:posting)
          .permit(
            :email,
            :area,
            :parent_name,
            :student_name,
            :subject,
            :subject_grade_level,
            :price_point,
            :start_date,
            :about_student,
            :tutor_note,
            :tutor_compassionate,
            :tutor_structured,
            :tutor_creative,
            :tutor_analytical
          )
      end
    end
  end
end
