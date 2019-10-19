MessageRequest.all.each do |message_request|
  message_request.update(status: message_request.current_state)
end
