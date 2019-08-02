require 'rails_helper'

RSpec.feature "POST /celebrities", js: true do
  let(:user_celebrity) { create(:user_celebrity, :confirmed) }

  before { FileUtils.rm_rf("#{Rails.root}/storage_test"); sign_in_user(user_celebrity) }

  context "The celebrity fills_in the form correctly" do
    scenario "A celebrity should be created and should be redirected" do
      select "COP $100.000", from: "celebrity[price]"

      fill_in "celebrity[biography]", with: "Yeah yeah, I'm very interesting"
      fill_in "celebrity[handle]", with: "@bigshit"
      attach_file "celebrity[photo]", file_fixture("profile_photo.jpg")

      click_on "Finalizar"

      expect(Celebrity.count).to eq(1)

      celebrity = Celebrity.last
      expect(celebrity.biography).to eq("Yeah yeah, I'm very interesting")
      expect(celebrity.handle).to eq("@bigshit")
      expect(celebrity.user.photo.attached?).to be_truthy

      expect(current_path).to eq(root_path)
      expect(page).to have_content("Tu perfil esta actualizado")
    end
  end

  context "The celebrity does not fill in the form correctly" do
    scenario "A celebrity should not be created and should not be redirected" do
      fill_in "celebrity[biography]", with: "Yeah yeah, I'm very interesting"
      fill_in "celebrity[handle]", with: "@bigshit"
      attach_file "celebrity[photo]", file_fixture("profile_photo.jpg")
      click_on "Finalizar"

      message = page.find_field("celebrity[price]").native.attribute("validationMessage")
      expect(message).to eq "Please select an item in the list."

      expect(Celebrity.count).to eq(0)

      expect(current_path).to eq(new_celebrity_path)
    end
  end
end
