ActiveAdmin.register User do
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

  # belongs_to :search_request

  scope('Teacher', default: true) { |_scope| Teacher.all.order(created_at: :desc) }
  scope('Learner') { |_scope| Learner.all.order(created_at: :desc) }

  member_action :approve, method: :put do
    resource.approve!
    redirect_to admin_users_path, notice: 'Approved!'
  end

  member_action :disable, method: :put do
    resource.disable!
    redirect_to admin_users_path, notice: 'Disabled!'
  end

  member_action :destroy, method: :delete do
    resource.references.delete_all
    resource.educations.delete_all
    resource.delete
    redirect_to admin_users_path, notice: 'Deleted!'
  end

  actions :all, except: %w[edit update]

  filter :first_name
  filter :last_name
  filter :email
  filter :type
  filter :approved
  filter :zip
  filter :years_exp
  filter :created_at

  index do |_user|
    selectable_column
    column('Name', &:name)
    column :email
    column :phone_number
    column :approved
    column('References#') { |instance| "#{instance.references.confirmed.count}/#{instance.references.count}" }
    column('Educations#') { |instance| instance.educations.count }

    if params[:scope] == 'learner'
      column('Enquiry#') { |instance| link_to_if instance.search_requests.count.positive?, instance.search_requests.count, admin_search_requests_path(user_id: instance.id) }
    end

    column :zip
    column('Exp', &:years_exp)
    column :updated_at
    column :actions do |resource|
      links = link_to I18n.t('active_admin.view'), resource_path(resource)

      links += if resource.approved?
                 link_to 'Disable', disable_admin_user_path(resource), method: :put, style: 'padding: 0 10px', data: { confirm: 'Are you sure?' }
               else
                 link_to 'Approve', approve_admin_user_path(resource), method: :put, style: 'padding: 0 10px', data: { confirm: 'Are you sure?' }
               end

      links += link_to 'Delete', resource_path(resource), confirm: 'Are you sure?', style: 'padding: 0 10px', method: :delete

      links
    end
  end

  show do |_attr|
    tabs do
      tab 'OverView' do
        attributes_table do
          row(:type)
          row(:first_name)
          row(:last_name)
          row(:email)
          row(:bio)
          row(:tag_line)
          row(:subject_qualifications)
          row(:subject)
          row(:approved)
          row(:reference_personal_note)
          row(:student_name)
          # row(:why_tutor)
          # row('Contact', &:live)
          # row('Hourlt Rate', &:hourly_rate)
          row(:latitude)
          row(:longitude)
          row(:created_at)
          row(:updated_at)
        end
      end

      tab 'Personal Info' do
        attributes_table do
          row(:zip)
          row(:years_exp)
          row(:travel)
          row(:phone_number)
        end
      end

      # tab 'Subjects' do
      # table_for user.subjects do
      # column('Subject', &:name)
      # column('Grade Level', &:grade_level)
      # end
      # end

      tab 'Educations' do
        table_for user.educations do
          column('Degree', &:degree)
          column('Course', &:course)
          column('Institiute', &:institute)
        end
      end
      tab 'References' do
        table_for user.references do
          column('First Name', &:first_name)
          column('Last Name', &:last_name)
          column('Email', &:email)
          # column('Personal Note', &:personal_note)
          column('Confirmed', &:confirmed)
          # column('Reference', &:reference_text)
        end
      end
    end
  end
end
