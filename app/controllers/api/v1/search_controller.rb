module Api
  module V1
    class SearchController < ApiController
      def index
        page = params[:page] || 1
        per_page = params[:per_page] || 6
        tutor_request = tutor_search_params.to_h.symbolize_keys

        # TODO: prefer only city or zip (delete other if provided)

        tutors = User.qualified_tutors_for(tutor_request)
          .page(page)
          .per(per_page)

        if tutors.present?
          render status: 200, json: {
            message: 'Users found',
            users: tutors.map(&:profile_json),
            pages: tutors.total_pages
          }
        else
          render status: 200, json: {
            message: 'We were not able to find any tutors in your area that matched your requirements. Please try again.',
            users: []
          }
        end
      end

      private

      def tutor_search_params
        params
          .permit(
            :subject,
            :zip,
            :hourly_rate_low,
            :hourly_rate_high,
            :availability,
            :city,
            :subject_grade_level,
            :userType,
            :page,
            :per_page,
          )
      end
    end
  end
end
