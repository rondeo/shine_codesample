module Api
  module V1
    class EducationsController < ApiController
      before_action :authenticate_api_v1_user!

      def create
        # raise "vineet".inspect
        education = Education.new(education_params)

        if education.save
          render json: education.user.educations
        else
          render json: education.errors, status: 422
        end
      end

      def update
        education = Education.find(params[:id])

        if education.update_attributes(education_params)
          render json: education.user.educations
        else
          render json: education.errors, status: 422
        end
      end

      def destroy
        education = Education.find(params[:id])

        if education.delete
          render json: education.user.educations
        else
          render json: education.errors, status: 422
        end
      end

      private

      def education_params
        params
          .require(:education)
          .permit(
            :user_id,
            :degree,
            :course,
            :institute
          )
      end
    end
  end
end
