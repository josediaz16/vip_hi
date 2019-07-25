class Users::ConfirmationsController < Devise::ConfirmationsController
  protected

  def after_confirmation_path_for(_, resource)
    bypass_sign_in(resource)

    if resource.origin.present?
      resource.origin
    else
      after_sign_in_path_for(resource)
    end
  end
end
