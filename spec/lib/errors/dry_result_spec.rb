require 'rails_helper'

Schema = Dry::Validation.Params(Validators::Base) do
  required(:name).filled(:str?)
  required(:email).filled(min_size?: 5)
end

RSpec.describe Errors::DryResult do
  subject { described_class.new(schema, :user) }

  let(:input) do
    {
      email: "",
      name: ""
    }
  end

  let(:schema) { Schema.(input) }

  context "The input is valid" do
    it "Should return an array with the errors" do
      expect(subject.parse).to match_array([
        {
          object_class: "user",
          field: "email",
          code: "blank",
          description: "no puede estar vacío",
          value: "",
          extra: {}
        },
        {
          object_class: "user",
          field: "name",
          code: "blank",
          description: "no puede estar vacío",
          value: "",
          extra: {}
        }
      ])
    end
  end
  context "The input is valid" do
    let(:input) do
      {
        email: "josediaz@fluvip.com",
        name: "Jose"
      }
    end

    it "Should return an empty array" do
      expect(subject.parse).to eq([])
    end
  end
end
