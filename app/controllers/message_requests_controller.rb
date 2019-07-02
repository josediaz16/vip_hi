class MessageRequestsController < ApplicationController
  def create
    json_service(MessageRequests::Create, message_request_params) do |result, blueprint|
      blueprint.merge redirect_url: celebrities_path
    end
  end

  private
  def message_request_params
    params
      .require(:message_request)
      .permit(:email_to, :celebrity_id, :from, :to, :brief)
      .to_h
      .merge(fan_id: current_user.fan.id)
      .symbolize_keys
  end
end
