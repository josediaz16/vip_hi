class Users::RegistrationsController < Devise::RegistrationsController

  def create
    json_service(Users::CreateCelebrity.new(create_celebrity: Fns::DoNothing), user_params) do |blueprint, result|
      blueprint.merge redirect_url: confirmation_alert_path(result[:model].confirmation_token)
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:email, :name, :known_as, :password, :password_confirmation, :phone, :country, :photo)
      .to_h
      .symbolize_keys
  end
end
