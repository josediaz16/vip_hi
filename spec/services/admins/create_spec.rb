require 'rails_helper'

describe Admins::Create do
  let(:subject)  { described_class }
  let(:colombia) { create(:country) }

  let(:input) do
    {
      email: "new@user.com",
      phone: "3212345678",
      name: "New User",
      password: "mypassword",
      password_confirmation: "mypassword",
      country: colombia.code_iso
    }
  end

  let!(:admin_role) { create(:role, name: "admin") }

  let(:response) { subject.(input) }

  context "All the fields are valid" do
    it "Should be success" do

      expect(response).to be_success
      expect(User.count).to eq(1)

      user = User.last
      expect(response.success[:model]).to eq(user)

      expect(user.email).to     eq input[:email]
      expect(user.phone).to     eq input[:phone]
      expect(user.name).to      eq input[:name]
      expect(user.known_as).to  eq ""
      expect(user.country).to   eq colombia

      expect(user.roles.count).to eq(1)
      expect(user.roles.pluck(:name)).to eq ["admin"]
    end
  end

  context "The email is invalid" do
    it "should be failure" do
      input.merge!(email: "newuser.com")

      expect(response).to be_failure

      expect(response.failure[:errors]).to match_array([
        {
          object_class: "user",
          field: "email",
          code: "format",
          description: "debe ser un correo válido",
          value: "newuser.com",
          extra: {}
        }
      ])
    end
  end

  context "The phone is invalid" do
    it "should be failure" do
      input.merge!(phone: "212345678")
      expect(response).to be_failure

      expect(response.failure[:errors]).to match_array([
        {
          object_class: "user",
          field: "phone",
          code: "format",
          description: "debe ser un número válido",
          value: "212345678",
          extra: {}
        }
      ])
    end
  end

  context "The password lenght is not valid" do
    it "should be failure" do
      input.merge!(password: "mypass")
      expect(response).to be_failure

      expect(response.failure[:errors]).to match_array([
        {
          object_class: "user",
          field: "password",
          code: "length",
          description: "debe tener al menos 8 caracteres",
          value: "mypass",
          extra: {}
        }
      ])
    end
  end

  context "The passwords don't match" do
    it "should be failure" do
      input.merge!(password_confirmation: "mypass")
      expect(response).to be_failure

      expect(response.failure[:errors]).to match_array([
        {
          object_class: "user",
          field: "password_confirmation",
          code: "confirmation",
          description: "la contraseña debe coincidir",
          value: "mypass",
          extra: {}
        }
      ])
    end
  end
end
