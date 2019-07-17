require 'rails_helper'

RSpec.feature "POST /celebrities/:celebrity_id/message_requests", js: true do
  let(:celebrity) { create(:celebrity) }
  let(:fan)       { create(:fan) }

  let(:input) do
    {
      email_to: "new@user.com",
      to: "Juanito",
      from: "Pepito",
      brief: "Quiero que le digan a juanito que es un imbecil!",
      celebrity_id: celebrity.id
    }
  end

  before { clear_emails }

  def fill_form
    fill_in "message_request[email_to]", with: input[:email_to]
    fill_in "message_request[from]",     with: input[:from]
    fill_in "message_request[to]",       with: input[:to]
    fill_in "message_request[brief]",    with: input[:brief]

    click_on "Comprar saludo $350.000"
    wait_for_ajax
  end

  def good_expectations
    expect(MessageRequest.count).to eq(1)

    message_request = MessageRequest.last
    expect(message_request.email_to).to eq  input[:email_to]
    expect(message_request.to).to  eq       input[:to]
    expect(message_request.from).to  eq     input[:from]
    expect(message_request.brief).to eq     input[:brief]
    expect(message_request.celebrity).to eq celebrity

    expect(current_path).to eq(celebrities_path)
  end

  def good_scenario
    visit celebrity_path(celebrity)
    fill_form
    good_expectations
  end

  context "The input is valid" do
    context "The user is logged in" do
      scenario "It should create the message_request and redirect to payment_path" do
        sign_in_user(fan.user)
        good_scenario
      end
    end

## Uncomment this code if fan_id is required for message_requests
#
#    context "The user is not logged in" do
#      scenario "Should be redirected to sign in and then returned to form" do
#        visit celebrity_path(celebrity)
#        fill_form
#
#        expect(current_path).to eq(new_user_session_path)
#        fill_in_sign_in_form(fan.user)
#        expect(current_path).to eq(celebrity_path(celebrity))
#
#        click_on "Enviar"
#        wait_for_ajax
#        good_expectations
#      end
#    end
#
#    context "The user is not registered" do
#      scenario "Should be redirected to sign in and then returned to form" do
#        create(:country, name: 'Colombia', code_iso: 'CO')
#        create(:role, name: 'fan')
#
#        visit celebrity_path(celebrity)
#        fill_form
#
#        expect(current_path).to eq(new_user_session_path)
#        click_on 'Crea una aquí'
#
#        fill_in "user[email]",                  with: "pepito@mail.com"
#        fill_in "user[name]",                   with: "Ken Addams"
#        fill_in "user[phone]",                  with: "3245678900"
#        fill_in "user[password]",               with: "mypassword"
#        fill_in "user[password_confirmation]",  with: "mypassword"
#
#        click_button "Enviar"
#        wait_for_ajax
#
#        user = User.last
#
#        open_email("pepito@mail.com")
#        expect(current_email).to have_content("You can confirm your account email through the link below")
#        visit user_confirmation_path(confirmation_token: user.confirmation_token)
#
#        expect(current_path).to eq(celebrity_path(celebrity))
#
#        click_on "Enviar"
#        wait_for_ajax
#        good_expectations
#      end
#    end
  end

  context "The input is not valid" do
    scenario "It should not create the message_request and show the errors" do
      visit celebrity_path(celebrity)

      fill_in "message_request[email_to]", with: "pepito"
      fill_in "message_request[from]",     with: input[:from]
      fill_in "message_request[to]",       with: input[:to]

      click_button "Comprar saludo $350.000"
      wait_for_ajax

      expect(current_path).to eq celebrity_path(celebrity)

      expect(page).to have_content("Tu formulario tiene errores, por favor no seas un idiota")
      expect(page).to have_content("El formato no es válido")

      expect(MessageRequest.count).to eq(0)
    end
  end

end
