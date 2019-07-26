class Admins::CelebritiesController < ApplicationController
  def new
    @presenter = Presenters::UsersPresenter.new({})
  end

  def create
    result = Users::CreateCelebrity.(celebrity_params)

    if result.success?
      flash[:success] = t("components.user_creator.alerts.messages.create_resource", resource: t("resources.user"))
      redirect_to admins_celebrities_path
    else
      flash.now[:error] = t("components.user_creator.alerts.messages.error")
      @presenter = Presenters::UsersPresenter.new({}, errors: result.failure[:errors])
      render :new
    end
  end

  private

  def celebrity_params
    params
      .require(:user)
      .permit(:name, :known_as, :password, :password_confirmation, :email, :country, :phone, :photo, :price)
      .to_h.merge(confirmed_at: Time.now)
      .symbolize_keys
  end
end
