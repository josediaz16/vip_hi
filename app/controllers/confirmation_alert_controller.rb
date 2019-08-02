class ConfirmationAlertController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    @user = User.find_by(confirmation_token: params[:token])
  end
end
