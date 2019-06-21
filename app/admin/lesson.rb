ActiveAdmin.register Lesson do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :learner_id, :tutor_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  config.sort_order = 'created_at_desc'

  actions :all, except: %w[edit update destroy]

  filter :tutor
  filter :learner
  filter :status
  filter :payment_status

  index do
    selectable_column
    column :learner
    column :tutor
    column :subject
    column :date
    column :status
    column('Payment <br/>Status'.html_safe) { |instance| instance.payment_status }
    column('Duration') { |instance| "#{instance.duration_in_mins}"}
    column('Rate <br/>/Hour'.html_safe) { |instance| "#{number_to_currency(instance.hourly_rate)}"}
    column('Amount') { |instance| "#{number_to_currency(instance.chargeable_amount_in_dollar)}" }
    column('Charged <br/>Amount'.html_safe) { |instance| instance.charges.present? ? "#{number_to_currency(instance.charged_amount_in_dollar)}" : '' }
    column :rating
    column :created_at

    actions
  end
end
