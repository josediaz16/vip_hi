module MessageRequests
  AddReferenceCode = -> input do
    reference_code = Digest::SHA1.hexdigest Time.now.strftime("%N")
    input.merge reference_code: reference_code
  end

  Create = AddReferenceCode | Common::BasicTxBuilder.(Validators::MessageRequests::Create, MessageRequest)
end
