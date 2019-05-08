class Users::ConfirmationsController < Devise::ConfirmationsController
  protected

  def after_confirmation_path_for(_, resource)
    bypass_sign_in(resource)
    new_celebrity_path
  end
end
