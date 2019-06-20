require 'rails_helper'

describe Celebrities::Create do
  let(:subject)  { described_class }
  let(:user)     { create(:user_celebrity) }

  let(:input) do
    {
      biography: "Hi you mf",
      price: 3.5,
      user_id: user.id
    }
  end

  let(:response) { subject.(input) }

  context "All the fields are valid" do
    it "Should be success" do
      expect(response).to be_success

      expect(Celebrity.count).to eq(1)

      celebrity = Celebrity.last
      expect(celebrity.price).to eq(3.5)
      expect(celebrity.user).to eq(user)
    end
  end

  context "The price is zero" do
    it "should be failure" do
      input[:price] = 0
      expect(response).to be_failure

      expect(response.failure).to eq(
        errors: [
          {
            object_class: "celebrity",
            field: "price",
            code: "size",
            description: "no puede ser menor a 0",
            value: 0,
            extra: {}
          }
        ]
      )
    end
  end

  context "The user_id is not present" do
    it "should be failure" do
      input.delete(:user_id)
      expect(response).to be_failure

      expect(response.failure).to eq(
        errors: [
          {
            object_class: "celebrity",
            field: "user_id",
            code: "blank",
            description: "no puede estar vacío",
            value: nil,
            extra: {}
          }
        ]
      )
    end
  end
end
