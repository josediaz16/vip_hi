require 'rails_helper'

describe Validators::Celebrities::Create do
  let(:subject) { described_class }

  let(:input) do
    {
      price: 2.5,
      biography: "Hi you mf",
      user_id: 1
    }
  end

  let(:response) { subject.(input) }

  context "All the fields are valid" do
    it "should be success" do
      expect(response).to be_success
    end
  end

  context "The price is zero" do
    it "should be failure" do
      input[:price] = 0
      expect(response).to be_failure
      expect(response.messages).to eq({
        price: ["size~no puede ser menor a 0"]
      })
    end
  end

  context "The user_id is not present" do
    it "should be failure" do
      input.delete(:user_id)
      expect(response).to be_failure
      expect(response.messages).to eq({
        user_id: ["blank~no puede estar vacío"]
      })
    end
  end
end
