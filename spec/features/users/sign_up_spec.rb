require 'rails_helper'

RSpec.describe "Users Sign up", type: :feature, js: true do
  before do
    #clear_emails
    create(:country, name: 'Colombia', code_iso: 'CO')
    visit new_user_registration_path
  end

  context "The input is valid" do
    scenario "It should create the user and redirect to confirmation path" do
      fill_in "user[email]",                  with: "pepito@mail.com"
      fill_in "user[name]",                   with: "Pepito Perez"
      fill_in "user[known_as]",               with: "Ken Addams"
      fill_in "user[phone]",                  with: "3245678900"
      fill_in "user[password]",               with: "mypassword"
      fill_in "user[password_confirmation]",  with: "mypassword"

      click_button "Sign Up"

      expect(User.count).to eq(1)

      user = User.last
      expect(user.email).to eq("pepito@mail.com")
      expect(user.name).to  eq("Pepito Perez")
      expect(user.known_as).to  eq("Ken Addams")
      expect(page).to have_content("Buen trabajo, ahora confirma tu correo")

      #open_email("pepito@mail.com")
      #expect(current_email).to have_content("CONFIRM YOUR EMAIL")
      visit user_confirmation_path(confirmation_token: user.confirmation_token)

      expect(current_path).to eq(new_celebrity_path)
    end
  end

  context "The input is not valid" do
    scenario "It should not create the user and show the errors" do
      fill_in "user[email]",                  with: "pepito@mail"
      fill_in "user[name]",                   with: "Pepito Perez"
      fill_in "user[phone]",                  with: "3245678900"
      fill_in "user[password]",               with: "mypassword"
      fill_in "user[password_confirmation]",  with: "mypassword2"

      click_button "Sign Up"

      expect(current_path).to eq(user_registration_path)
      expect(page).to have_content("Tu registro tiene errores, por favor no seas un idiota")
      expect(page).to have_content("El email no es válido")
      expect(page).to have_content("La contraseña no coincide")

      expect(User.count).to eq(0)
    end
  end

  context "The email is taken" do
    scenario "It should not create the user and show the errors" do
      create(:user, email: "pepito@mail.com")

      fill_in "user[email]",                  with: "pepito@mail.com"
      fill_in "user[name]",                   with: "Pepito Perez"
      fill_in "user[known_as]",               with: "Ken Addams"
      fill_in "user[phone]",                  with: "3245678900"
      fill_in "user[password]",               with: "mypassword"
      fill_in "user[password_confirmation]",  with: "mypassword"

      click_button "Sign Up"

      expect(current_path).to eq(user_registration_path)
      expect(page).to have_content("Tu registro tiene errores, por favor no seas un idiota")
      expect(page).to have_content("Ya ha sido tomado")

      expect(User.count).to eq(1)
    end
  end
end
