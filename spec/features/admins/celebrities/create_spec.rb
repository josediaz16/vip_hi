require 'rails_helper'

RSpec.feature "POST /admins/celebrities/" do
  let!(:colombia) { create(:country, name: 'Colombia', code_iso: 'CO') }
  let!(:mexico)   { create(:country, name: 'México', code_iso: 'MX') }

  let(:admin) { create(:admin) }

  before do
    clear_emails
    create(:role, name: 'celebrity')
    sign_in_user(admin.user)
  end

  context "The input is valid" do
    scenario "Should create a celebrity" do
      fill_in "user[email]",                  with: "pepito@mail.com"
      fill_in "user[name]",                   with: "Pepito Perez"
      fill_in "user[known_as]",               with: "Ken Addams"
      fill_in "user[phone]",                  with: "3245678900"
      fill_in "user[password]",               with: "mypassword"
      fill_in "user[password_confirmation]",  with: "mypassword"

      attach_file "user[photo]", file_fixture("profile_photo.jpg")

      select "Colombia", from: "user[country]"

      click_button "Enviar"

      expect(User.count).to eq(2)

      user = User.last
      expect(user.email).to eq("pepito@mail.com")
      expect(user.name).to  eq("Pepito Perez")
      expect(user.known_as).to  eq("Ken Addams")
      expect(user.phone).to  eq("3245678900")
      expect(user.confirmed_at).not_to  be_blank
      expect(user.photo.attached?).to be_truthy
      expect(user.roles.pluck(:name)).to eq ["celebrity"]
      expect(page).to have_content("Se ha creado el usuario correctamente")

      expect(current_email).to be_nil
      expect(current_path).to eq(admins_celebrities_path)
    end
  end

  context "The input is not valid" do
    scenario "It should not create the user and show the errors" do
      fill_in "user[email]",                  with: "pepito@mail"
      fill_in "user[name]",                   with: "Pepito Perez"
      fill_in "user[phone]",                  with: "3245678900"
      fill_in "user[password]",               with: "mypassword"
      fill_in "user[password_confirmation]",  with: "mypassword2"

      click_button "Enviar"

      expect(current_path).to eq(admins_celebrities_path)

      expect(page).to have_content("Tu formulario tiene errores, por favor no seas un idiota")
      expect(page).to have_content("debe ser un correo válido")
      expect(page).to have_content("la contraseña debe coincidir")

      expect(User.count).to eq(1)
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
      select "Colombia", from: "user[country]"

      click_button "Enviar"

      expect(current_path).to eq(admins_celebrities_path)
      expect(page).to have_content("Tu formulario tiene errores, por favor no seas un idiota")
      expect(page).to have_content("ya ha sido tomado")

      expect(User.count).to eq(2)
    end
  end
end

