module Api
  module V1
    class ReferencesController < ApiController
      def show
        ref = Reference.find_by(uuid: params[:id])
        if ref.present?
          render status: 200, json: {
            ref: ref,
            tutor_name: ref.user.name,
            tutor_image_url: ref.user.image_url,
          }
        else
          render status: 400, json: {
            message: 'Reference not found',
            ref_id: params[:id],
            errors: 'Reference not found'
          }
        end
      end

      def create
        reference = Reference.new(reference_params)
        reference.confirmed = true
        reference.confirmed_at = Time.now
        if reference.save
          render json: reference.user.confirmed_references
        else
          render json: reference.errors, status: 422
        end
      end

      def update
        reference = Reference.find(params[:id])

        # confirm the reference
        unless reference.confirmed
          reference.confirmed = true
          reference.confirmed_at = Time.now
        end

        # find or create parent
        # TODO: Frontend should not link creating reference with creating user
        # - create user in own API call
        # - reference is automagically updated via has_many inverse_of
        # - side benefit: user comes back logged in for free
        parent_email = reference_params[:email] || reference.email
        parent = User.find_by(email: parent_email)
        if !parent && params[:create_account]
          user_info = {
            first_name: reference.first_name,
            last_name: reference.last_name,
            email: parent_email,
            password: params[:password],
            approved: true,
          }

          parent = Learner.create(user_info)
        end

        if parent
          reference.referenced_by = parent.id
        end
        # tutor's reference_count will automagically update via counter_cache: https://guides.rubyonrails.org/association_basics.html#options-for-belongs-to-counter-cache

        if reference.update_attributes(reference_params)
          render json: reference.user.confirmed_references
        else
          render json: reference.errors, status: 422
        end
      end

      private

      def reference_params
        params
          .require(:reference)
          .permit(
            :email,
            :user_id,
            :reference_text,
            :reference_title,
            :first_name,
            :last_name,
            :referenced_by,
          )
      end
    end
  end
end
