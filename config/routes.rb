Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :search_requests, only: %w[create]
      resources :search, only: %w[index]
      resources :references, only: %w[show create update]
      resources :educations, only: %w[create update destroy]
      resources :postings, only: %w[create index]
      resources :hiring_requests, only: %w[create index] do
        member do
          get :subject
        end
      end
      resources :messages, only: %w[create index] do
        member do
          get :conv_messages
        end
      end
      resources :lessons, only: %w[create index] do
        collection do
          get :parents
          get :tutors
        end
        member do
          # put :refund
          put :update_status
        end
      end

      resources :user_profiles, only: %w[index update show] do
        put :update_express_account
        collection do
          post :upload
          get :profile
          put :update_stripe_token
          get :card_info
          get :stripe_dashboard_url
        end
      end
      resource :mailchimp, only: %w[] do
        post :signup_newsletter
      end
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        passwords: 'overrides/passwords',
        registrations: 'overrides/registrations'
      }
    end
  end

  # user profiles

  # post '/users/:id/approve', to: 'tutor_applications#approve', as: :approve_user
  # get '/admin/postings', to: 'postings#index'
  # get '/admin/applications', to: 'tutor_applications#index'

  get '*path', to: 'static_pages#landing'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#landing'
end
