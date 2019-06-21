module Api
  module V1
    class HiringRequestsController < ApiController
      before_action :authenticate_api_v1_user!

      def create
        hiring_request = HiringRequest.new(hiring_request_params)
        hiring_request.learner_id = current_user.id

        if hiring_request.save
          SendHiringRequestEmailJob.perform_later(hiring_request.learner_id)
          render json: hiring_request
        else
          render json: hiring_request.errors, status: 422
        end
      end

      def subject
        hiring_request = current_api_v1_user.students.find_by(learner_id: params[:id])

        render json: hiring_request
      end

      private

      def hiring_request_params
        params.require(:hiring_request).permit(:tutor_id)
      end
    end
  end
end
