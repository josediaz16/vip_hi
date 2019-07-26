require 'rails_helper'

RSpec.describe "Users Sign up", type: :feature, js: true do
  before do
    clear_emails
    create(:country, name: 'Colombia', code_iso: 'CO')
    create(:role, name: 'celebrity')
    create(:role, name: 'fan')
  end

  context "The input is valid" do
    context "It's a celebrity" do
      scenario "It should create the user and redirect to confirmation path" do
        visit new_user_registration_path

        fill_in "user[email]",                  with: "pepito@mail.com"
        fill_in "user[known_as]",               with: "Ken Addams"
        fill_in "user[phone]",                  with: "3245678900"
        fill_in "user[password]",               with: "mypassword"
        fill_in "user[password_confirmation]",  with: "mypassword"

        click_button "Enviar"

        wait_for_ajax

        expect(User.count).to eq(1)
        expect(Celebrity.count).to eq(0)

        user = User.last
        expect(user.email).to eq("pepito@mail.com")
        expect(user.known_as).to  eq("Ken Addams")
        expect(user.roles.pluck(:name)).to eq ["celebrity"]
        expect(page).to have_content("Buen trabajo, ahora confirma tu correo")

        open_email("pepito@mail.com")
        expect(current_email).to have_content("You can confirm your account email through the link below")
        visit user_confirmation_path(confirmation_token: user.confirmation_token)

        expect(current_path).to eq(new_celebrity_path)
      end
    end

    context "It's a fan" do
      scenario "It should create the user and redirect to confirmation path" do
        visit new_user_registration_path(role: "fan")

        fill_in "user[email]",                  with: "pepito@mail.com"
        fill_in "user[name]",                   with: "Ken Addams"
        fill_in "user[phone]",                  with: "3245678900"
        fill_in "user[password]",               with: "mypassword"
        fill_in "user[password_confirmation]",  with: "mypassword"

        click_button "Enviar"

        wait_for_ajax

        expect(User.count).to eq(1)
        expect(Fan.count).to eq(1)

        user = User.last
        expect(user.email).to eq("pepito@mail.com")
        expect(user.name).to  eq("Ken Addams")
        expect(user.roles.pluck(:name)).to eq ["fan"]
        expect(page).to have_content("Buen trabajo, ahora confirma tu correo")

        open_email("pepito@mail.com")
        expect(current_email).to have_content("You can confirm your account email through the link below")
        visit user_confirmation_path(confirmation_token: user.confirmation_token)

        expect(current_path).to eq(celebrities_path)
      end
    end
  end

  context "The input is not valid" do
    scenario "It should not create the user and show the errors" do
      visit new_user_registration_path

      fill_in "user[email]",                  with: "pepito@mail"
      fill_in "user[phone]",                  with: "3245678900"
      fill_in "user[password]",               with: "mypassword"
      fill_in "user[password_confirmation]",  with: "mypassword2"

      click_button "Enviar"
      wait_for_ajax

      expect(current_path).to eq(new_user_registration_path)

      expect(page).to have_content("Tu formulario tiene errores, por favor no seas un idiota")
      expect(page).to have_content("El formato no es válido")
      expect(page).to have_content("Las contraseñas deben coincidir")

      expect(User.count).to eq(0)
    end
  end

  context "The email is taken" do
    scenario "It should not create the user and show the errors" do
      visit new_user_registration_path
      create(:user, email: "pepito@mail.com")

      fill_in "user[email]",                  with: "pepito@mail.com"
      fill_in "user[known_as]",               with: "Ken Addams"
      fill_in "user[phone]",                  with: "3245678900"
      fill_in "user[password]",               with: "mypassword"
      fill_in "user[password_confirmation]",  with: "mypassword"

      click_button "Enviar"
      wait_for_ajax

      expect(current_path).to eq(new_user_registration_path)
      expect(page).to have_content("Tu formulario tiene errores, por favor no seas un idiota")
      expect(page).to have_content("ya ha sido tomado")

      expect(User.count).to eq(1)
    end
  end
end
