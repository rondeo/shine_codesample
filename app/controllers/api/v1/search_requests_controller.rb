module Api
  module V1
    class SearchRequestsController < ApiController
      def create
        search_request = SearchRequest.new(search_request_params)
        if search_request.save
          render json: search_request, status: :created
        else
          render json: search_request.errors, status: 422
        end
      end

      private

      def search_request_params
        params
          .require(:search_request)
          .permit(
            :user_type,
            :grade,
            :school,
            :city,
            :subject,
            :price_range,
            :tutoring_type,
            :motivated,
            :shy,
            :outgoing,
            :focuses_trouble,
            :focuses_well,
            :name,
            :student_name,
            :email,
            :phone,
            :zip,
            availability: []
          )
      end
    end
  end
end
