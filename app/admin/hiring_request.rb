ActiveAdmin.register HiringRequest do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :learner_id, :tutor_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  config.sort_order = 'updated_at_desc'

  actions :all, except: %w[edit update]

  filter :tutor
  filter :learner

  index do
    selectable_column
    column('Parent') { |instance| instance.learner.name }
    column('Teacher') { |instance| instance.tutor.name }
    column :subject
    column('Hourly Rate') { |instance| "#{instance.hourly_rate}" }
    column :updated_at

    actions
  end

  form do |f|
    f.inputs do
      f.input :learner
      f.input :tutor
    end
    f.actions
  end
end
