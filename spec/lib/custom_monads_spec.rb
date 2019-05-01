require 'rails_helper'

RSpec.describe CustomMonads do
  subject { described_class }

  describe "Zero" do
    context "value is nil" do
      it "should be none" do
        expect(described_class.Zero(nil)).to be_none
      end
    end
    context "value is 0" do
      it "should be none" do
        expect(described_class.Zero(0)).to be_none
      end
    end
    context "value is 0.0" do
      it "should be none" do
        expect(described_class.Zero(0.0)).to be_none
      end
    end
    context "value is different than 0" do
      it "should be some" do
        expect(described_class.Zero(1)).to be_some
      end
    end
  end
end
