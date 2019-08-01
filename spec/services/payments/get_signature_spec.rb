require 'rails_helper'

RSpec.describe Payments::GetSignature do
  let(:result) { described_class.(*input) }

  let(:input) { ["200000", "viphi_001"] }

  it "Should generate a signature key" do
    expect(result).to eq("60b9814028c40d1d69446d82238117ef")
  end
end
