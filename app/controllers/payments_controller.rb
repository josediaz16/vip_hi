class PaymentsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: :create

  def show
  end

  def create
    puts "pay u response"
    pp params
    render json: {}, status: 200
  end
end
