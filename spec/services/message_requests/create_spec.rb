require 'rails_helper'

describe MessageRequests::Create do
  let(:subject)  { described_class }

  let(:celebrity) { create(:celebrity) }

  let(:input) do
    {
      email_to: "new@user.com",
      to: "Juanito",
      from: "Pepito",
      brief: "Quiero que le digan a juanito que es un imbecil!",
      celebrity_id: celebrity.id
    }
  end

  let(:response) { subject.(input) }

  context "All the fields are valid" do
    it "Should be success" do

      expect(response).to be_success
      expect(MessageRequest.count).to eq(1)

      message_request = MessageRequest.last
      expect(response.success[:model]).to eq(message_request)
    end
  end

  context "The email_to is invalid" do
    it "should be failure" do
      input.merge!(email_to: "newuser.com")

      expect(response).to be_failure

      expect(response.failure[:errors]).to match_array([
        {
          object_class: "message_request",
          field: "email_to",
          code: "format",
          description: "debe ser un correo válido",
          value: "newuser.com",
          extra: {}
        }
      ])
    end
  end

  context "The to is missing" do
    it "should be failure" do
      input.merge!(to: "")
      expect(response).to be_failure

      expect(response.failure[:errors]).to match_array([
        {
          object_class: "message_request",
          field: "to",
          code: "blank",
          description: "no puede estar vacío",
          value: "",
          extra: {}
        }
      ])
    end
  end

  context "The brief is missing" do
    it "should be failure" do
      input.merge!(brief: "")
      expect(response).to be_failure

      expect(response.failure[:errors]).to match_array([
        {
          object_class: "message_request",
          field: "brief",
          code: "size",
          description: "debe tener entre 20 y 700 caracteres",
          value: "",
          extra: {}
        }
      ])
    end
  end

  context "The brief is too long" do
    it "should be failure" do
      input.merge!(brief: "a"*701)
      expect(response).to be_failure

      expect(response.failure[:errors]).to match_array([
        {
          object_class: "message_request",
          field: "brief",
          code: "size",
          description: "debe tener entre 20 y 700 caracteres",
          value: "a"*701,
          extra: {}
        }
      ])
    end
  end
end
