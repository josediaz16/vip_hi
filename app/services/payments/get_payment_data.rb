module Payments
  GetPaymentData = -> message_request do
    {
      signature: GetSignature.(message_request.celebrity.price, reference_code),
      reference_code: message_request.reference_code
    }
  end
end
