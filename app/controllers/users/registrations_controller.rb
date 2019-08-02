class Users::RegistrationsController < Devise::RegistrationsController

  def create
    json_service(Users::CreateRouter, user_params) do |result, blueprint|
      blueprint.merge redirect_url: confirmation_alert_path(token: result[:model].confirmation_token)
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:email, :name, :known_as, :password, :password_confirmation, :phone, :country, :photo, :role, :origin)
      .to_h
      .symbolize_keys
  end
end
