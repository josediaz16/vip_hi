require 'rails_helper'

RSpec.feature "POST /celebrities/:celebrity_id/message_requests", js: true do
  let(:celebrity) { create(:celebrity) }

  let(:input) do
    {
      email_to: "new@user.com",
      to: "Juanito",
      from: "Pepito",
      brief: "Quiero que le digan a juanito que es un imbecil!",
      celebrity_id: celebrity.id
    }
  end

  context "The input is valid" do
    scenario "It should create the message_request and redirect to payment_path" do
      visit celebrity_path(celebrity)

      fill_in "message_request[email_to]", with: input[:email_to]
      fill_in "message_request[from]",     with: input[:from]
      fill_in "message_request[to]",       with: input[:to]
      fill_in "message_request[brief]",    with: input[:brief]

      click_on "Enviar"

      wait_for_ajax

      expect(MessageRequest.count).to eq(1)

      message_request = MessageRequest.last
      expect(message_request.email_to).to eq  input[:email_to]
      expect(message_request.to).to  eq       input[:to]
      expect(message_request.from).to  eq     input[:from]
      expect(message_request.brief).to eq     input[:brief]
      expect(message_request.celebrity).to eq celebrity

      expect(current_path).to eq(celebrities_path)
    end
  end

  context "The input is not valid" do
    scenario "It should not create the message_request and show the errors" do
      visit celebrity_path(celebrity)

      fill_in "message_request[email_to]", with: "pepito"
      fill_in "message_request[from]",     with: input[:from]
      fill_in "message_request[to]",       with: input[:to]

      click_button "Enviar"
      wait_for_ajax

      expect(current_path).to eq celebrity_path(celebrity)

      expect(page).to have_content("Tu formulario tiene errores, por favor no seas un idiota")
      expect(page).to have_content("El formato no es válido")

      expect(MessageRequest.count).to eq(0)
    end
  end

end
