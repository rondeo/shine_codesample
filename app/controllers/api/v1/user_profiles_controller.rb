module Api
  module V1
    class UserProfilesController < ApiController
      before_action :normalize_keys!, only: [:index]
      before_action :authenticate_api_v1_user!, except: %i[index search show update_express_account]
      before_action :can_update?, only: %i[update]

      def index
        tutor_request = user_search_params.to_h.symbolize_keys

        @users = User.qualified_tutors_for(tutor_request).limit(3)
        if @users && !@users.empty?
          render status: 200, json: {
            message: 'Users found',
            users: @users.map(&:profile_json)
          }
        else
          render status: 400, json: {
            message: 'We were not able to find any tutors in your area that matched your requirements. Please try again.'
          }
        end
      end

      def profile
        render status: 200, json: {
          message: 'Users found',
          profile: current_user.profile_json
        }
      end

      def stripe_dashboard_url
        if current_user.stripe_account_id.present?
          account = Stripe::Account.retrieve(current_user.stripe_account_id)
          dashboard_url = account.login_links.create().url
        else
          dashboard_url = ''
        end

        render status: 200, json: { dashboard_url: dashboard_url }
      end

      def upload
        if params[:avatar].present? && current_user.update_attributes(avatar: params[:avatar])
          render status: 200, json: {
            message: 'Profile updated!',
            avatar_url: current_user.avatar.url(:thumb)
          }
        else
          render status: 400, json: {
            message: 'Unable to update Avatar',
            user_id: @user.id,
            errors: @user.errors.full_messages
          }
        end
      end

      def update
        if current_user.update_attributes(user_profile_params)
          render status: 200, json: {
            message: 'Profile updated!',
            user: current_user.profile_json
          }
        else
          render status: 401, json: {
            message: 'Unable to update user',
            user_id: @user.id,
            errors: current_user.errors.full_messages
          }
        end
      end

      def show
        @user = User.find_by(id: params[:id])

        if !@user || (@user.is_a?(Learner) && @user.id != get_current_user.try(:id))
          render status: 400, json: {
            message: 'User not found',
            user_id: params[:id].to_i,
            errors: 'User not found'
          }
        else
          render status: 200, json: {
            user: @user.profile_json,
            isreference: get_current_user.present? ? @user.references.where(referenced_by: get_current_user.id) : false
          }
        end
      end

      def update_express_account
        # abort
        # raise ENV['STRIPE_SECRET_KEY']
        user = User.find_by(express_state: params[:user_profile_id])
        return if user.stripe_account_id.present?

        response = RestClient.post(ENV['STRIPE_EXPRESS_OAUTH_TOKEN_URL'],
                                   code: params[:code],
                                   grant_type: 'authorization_code',
                                   client_secret: ENV['STRIPE_SECRET_KEY'])

        if response.code == 200
          user = User.find_by(express_state: params[:user_profile_id])
          stripe_token_id = eval(response.body)[:stripe_user_id]

          if user.present? && user.update_attributes(
              stripe_account_id: stripe_token_id,
              strpe_authorization_code: params[:code]
          )

            render status: 200, json: {
              message: 'Stripe account info updated!',
              user: user,
            }
          else
            render status: 400, json: {
              message: 'Unable to update Stripe account info',
              user_id: user.id,
              errors: user.errors.full_messages
            }
          end
        end
      end

      def update_stripe_token
        if current_user.update_attributes(user_profile_params)
          current_user.stripe_customer_id.present? ? update_stripe_account : create_stripe_account
     
          create_hiring_request(params[:recipient_id]) if params[:recipient_id].present?
        else
          render status: 400, json: {
            message: 'Unable to update stripe token',
            user_id: current_user.id,
            errors: current_user.errors.full_messages
          }
        end
      end

      private

      def create_hiring_request(tutor_id)
        hiring_request = HiringRequest.new({ tutor_id: tutor_id, learner_id: current_user.id })
    
        if hiring_request.save
          SendHiringRequestEmailJob.perform_later(hiring_request.learner_id, hiring_request.tutor_id)
        end
      end
  
      def update_stripe_account
        customer = Stripe::Customer.retrieve(current_user.stripe_customer_id)
        customer.source = current_user.stripe_token_id

        if customer.save
          cust_info = customer.sources.data.first

          current_user.update_attributes(brand: cust_info.brand, last4: cust_info.last4)
          # ProcessFailedChargesJob.perform_later(current_user.id)
          render status: 200, json: {
            message: 'Stripe token updated successfully!',
            user: current_user
          }
        else
          render status: 400, json: {
            message: 'Unable to update stripe token',
            user_id: current_user.id,
            errors: current_user.errors.full_messages
          }
        end
      end

      def create_stripe_account
        customer = Stripe::Customer.create(email: current_user.email, source: current_user.stripe_token_id)
        data = {
          stripe_customer_id: customer.id,
          brand: customer.sources.data.first.brand,
          last4: customer.sources.data.first.last4
        }
        if customer.present? && current_user.update_attributes(data)
          render status: 200, json: {
            message: 'Stripe token update successfully!',
            user: current_user
          }
        else
          render status: 400, json: {
            message: 'Unable to update stripe token',
            user_id: current_user.id,
            errors: current_user.errors.full_messages
          }
        end
      end

      def can_update?
        user_id = params[:id] || params[:user_profile_id]
        @user = User.find_by(id: user_id)

        if @user.blank?
          render status: 400, json: {
            message: 'User not found',
            user_id: params[:user_profile_id],
            errors: 'User not found'
          }
        elsif current_api_v1_user != @user
          render status: 401, json: {
            message: 'You are not authorized.',
            user_id: params[:user_profile_id],
            errors: 'You are not authorized.'
          }
        end
      end

      # exclude user_account params in favor of user-profile-specific ones
      # user-account params are modified via devise-token-auth controllers
      def user_profile_params
        params
          .require(:user)
          .permit(
            :email,
            :first_name,
            :last_name,
            :accept_tos,
            :zip,
            :subject,
            :avatar,
            :years_exp,
            :subject_qualifications,
            :hourly_rate_cents,
            :approved,
            :disabled,
            :accepting_new_students,
            :stripe_token_id,
            :express_state,
            :tag_line,
            :travel_distance,
            :gender,
            :phone_number,
            :street_address,
            :city,
            :state,
            :student_name,
            references_attributes: %i[
              name
              email
              personal_note
            ],
            subjects_attributes: %i[
              id
              name
              grade_level
              _destroy
            ],
            availability: []
          )
      end

      def user_search_params
        params
          .permit(
            :hourly_rate_low,
            :hourly_rate_high,
            :zip,
            :subject,
            :subject_grade_level
          )
      end
    end
  end
end
