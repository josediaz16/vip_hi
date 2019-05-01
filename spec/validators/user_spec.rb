require 'rails_helper'

describe Validators::Users::CreateCelebrity do
  let(:subject) { described_class }

  let(:input) do
    {
      email: "new@user.com",
      phone: "3212345678",
      name: "New User",
      known_as: "therossatron",
      password: "mypassword",
      password_confirmation: "mypassword",
      country_id: 1
    }
  end

  let(:response) { subject.(input) }

  context "All the fields are valid" do
    it "should be success" do
      expect(response).to be_success
    end
  end

  context "The email is invalid" do
    it "should be failure" do
      input.merge!(email: "newuser.com")
      expect(response).to be_failure
      expect(response.messages).to eq({
        email: ["format~debe ser un correo válido"]
      })
    end
  end

  context "The known_as is missing" do
    it "should be failure" do
      input.merge!(known_as: "")
      expect(response).to be_failure
      expect(response.messages).to eq({
        known_as: ["blank~no puede estar vacío"]
      })
    end
  end

  context "The phone is invalid" do
    it "should be failure" do
      input.merge!(phone: "212345678")
      expect(response).to be_failure
      expect(response.messages).to eq({
        phone: ["format~debe ser un número válido"]
      })
    end
  end

  context "The password lenght is not valid" do
    it "should be failure" do
      input.merge!(password: "mypass")
      expect(response).to be_failure
      expect(response.messages).to eq({
        password: ["length~debe tener al menos 8 caracteres"]
      })
    end
  end

  context "The passwords don't match" do
    it "should be failure" do
      input.merge!(password_confirmation: "mypass")
      expect(response).to be_failure
      expect(response.messages).to eq({
        password_confirmation: ["confirmation~la contraseña debe coincidir"]
      })
    end
  end
end
