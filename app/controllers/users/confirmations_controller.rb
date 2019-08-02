class Users::ConfirmationsController < Devise::ConfirmationsController
  protected

  def after_confirmation_path_for(_, resource)
    bypass_sign_in(resource)

    if resource.origin.present?
      resource.origin
    else
      options = {
        [:celebrity] => new_celebrity_path,
        [:fan]   => celebrities_path
      }
      roles = resource.roles.names_ordered.map(&:to_sym)
      options[roles]
    end
  end
end
