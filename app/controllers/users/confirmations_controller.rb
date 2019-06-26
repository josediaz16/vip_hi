class Users::ConfirmationsController < Devise::ConfirmationsController
  protected

  def after_confirmation_path_for(_, resource)
    bypass_sign_in(resource)

    if resource.origin.present?
      resource.origin
    else
      new_celebrity_path
    end
  end
end
