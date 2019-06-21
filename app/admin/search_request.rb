ActiveAdmin.register SearchRequest do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  config.sort_order = 'updated_at_desc'

  actions :all, except: %w[edit update new create]

  #filter :grade
  filter :subject
  #filter :school
  filter :user_type
  filter :email
  filter :zip

  controller do
    def scoped_collection
      if params[:user_id].present?
        SearchRequest.where(user_id: params[:user_id])
      else
        SearchRequest.all
      end
    end
  end

  index do
    selectable_column
    column :email
    column :student_name
    #column :city
    column :zip
    column :tutoring_type
    column :subject
    #column :grade
    column :price_range
    column :phone
    column :updated_at
    column :actions do |resource|
      links = link_to I18n.t('active_admin.view'), resource_path(resource)
      # user = User.where(email: resource.email).first
      links += link_to 'Parent', admin_user_path(resource.user), style: 'padding: 0 10px' if resource.user.present?
      links
    end
  end

  show do |_attr|
    tabs do
      tab 'Match data' do
        attributes_table do
          row(:user_type)
          row(:grade)
          row(:school)
          row(:city)
          row(:subject)
          row(:price_range)
          row(:tutoring_type)
          row(:motivated)
          row(:shy)
          row(:outgoing)
          row(:focuses_trouble)
          row(:focuses_well)
          row(:availability)
          row(:created_at)
          row(:updated_at)
        end
      end

      tab 'Personal Details' do
        attributes_table do
          row(:name)
          row(:student_name)
          row(:email)
          row(:phone)
          row(:zip)
        end
      end
    end
  end
end
