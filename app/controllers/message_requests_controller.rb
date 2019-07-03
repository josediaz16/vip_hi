require 'dry/monads/maybe'

class MessageRequestsController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    json_service(MessageRequests::Create, message_request_params) do |result, blueprint|
      blueprint.merge redirect_url: celebrities_path
    end
  end

  private
  def message_request_params
    params
      .require(:message_request)
      .permit(:email_to, :celebrity_id, :from, :to, :brief, :recipient_type)
      .to_h
      .symbolize_keys
      .tap do |message_request|
        Dry::Monads.Maybe(current_user)
          .bind { message_request.merge!(fan_id: current_user.fan.id) }
      end
  end
end
