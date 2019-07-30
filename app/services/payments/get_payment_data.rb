module Payments
  GetPaymentData = -> message_request do
    reference_code = "fgreet_00#{message_request.id}"
    {
      signature: GetSignature.(message_request.celebrity.price, reference_code),
      reference_code: reference_code
    }
  end
end
