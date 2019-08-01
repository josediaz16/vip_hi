class PaymentsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: :create

  def show
    message_request = MessageRequest.find_by reference_code: params[:referenceCode]
    @presenter = Presenters::PaymentsPresenter.new(message_request, params: params)
  end

  def create
    input = params.permit!.to_hash.deep_symbolize_keys

    result = Payments::Create.new.(input)
    if result.success?
      render json: {}, status: 200
    else
      render json: {}, status: 400
    end
  end
end
