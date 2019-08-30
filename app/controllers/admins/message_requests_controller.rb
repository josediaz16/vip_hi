class Admins::MessageRequestsController < ApplicationController
  layout "admin_layout"

  def index
    @message_requests = MessageRequest
      .includes(:celebrity)
      .page(params[:page])
      .per(9)
  end

  def update
    message_request = MessageRequest.find params[:id]
    next_state = params[:to_state]

    if message_request.transition_to(next_state)
      flash[:success] = "La transicion a #{next_state} se realizo correctamente"
    else
      flash[:error] = "No se pudo hacer la transicion a #{next_state}"
    end

    redirect_to admins_message_requests_path
  end
end
