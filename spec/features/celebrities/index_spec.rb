require 'rails_helper'

RSpec.describe "GET /celebrities", js: true do
  let!(:celebrity_role) { create(:role, name: 'celebrity') }

  let!(:colombia)  { create(:country, name: 'Colombia', code_iso: 'CO') }
  let!(:mexico)    { create(:country, name: 'Mexico', code_iso: 'MX') }
  let!(:argentina) { create(:country, name: 'Argentina', code_iso: 'AR') }

  let!(:juanes) do
    Celebrities::Create.(
      name: "Juan Esteban Aristizabal",
      country: "CO",
      email: "juanes@viphi.com",
      known_as: "Juanes",
      confirmed_at: Time.now,
      password: "default_pass_123",
      password_confirmation: "default_pass_123",
      biography: "cantante, compositor y músico colombiano de pop latino y rock en español que fusiona diversos ritmos musicales. También fue reconocido con varios Premios Grammy Latinos a lo largo de su carrera por exitosos álbumes como Mi sangre (2004).",
    )
  end
  let!(:shakira) do
    Celebrities::Create.(
      name: "Shakira Isabel Mebarak",
      country: "CO",
      email: "shakira@viphi.com",
      known_as: "Shakira",
      confirmed_at: Time.now,
      password: "default_pass_123",
      password_confirmation: "default_pass_123",
      biography: "cantautora, productora discográfica, bailarina, modelo, instrumentista, empresaria, actriz, embajadora de buena voluntad de la UNICEF, filántropa colombiana. Ha sido nombrada varias veces por Sony y Billboard con el sobrenombre de La Reina del Pop Latino.",
    )
  end
  let!(:lina_tejeiro) do
    Celebrities::Create.(
      name: "Lina Tejeiro",
      country: "CO",
      email: "lina_tejeiro@viphi.com",
      known_as: "Lina Tejeiro",
      confirmed_at: Time.now,
      password: "default_pass_123",
      password_confirmation: "default_pass_123",
      biography: "es una actriz colombiana, reconocida por actuar durante cinco años en la serie televisiva Padres e hijos en el papel de Sammy.",
    )
  end
  let!(:alejandro_fernandez) do
    Celebrities::Create.(
      name: "Alejandro fernandez",
      country: "MX",
      email: "alejandrofernandez@viphi.com",
      known_as: "Alejandro Fernandez",
      confirmed_at: Time.now,
      password: "default_pass_123",
      password_confirmation: "default_pass_123",
      biography: "es un cantante mexicano de música ranchera, hijo del también cantante ranchero Vicente Fernández. En un principio se especializó en formas tradicionales de música regional mexicana1 como ranchera y mariachi. ",
    )
  end
  let!(:leo_messi) do
    Celebrities::Create.(
      name: "Lionel Messi",
      country: "AR",
      email: "leomessi@viphi.com",
      known_as: "Leo messi",
      confirmed_at: Time.now,
      password: "default_pass_123",
      password_confirmation: "default_pass_123",
      biography: "es un futbolista argentino que juega como delantero o centrocampista. Ha desarrollado toda su carrera en el F. C. Barcelona de la Primera División de España y en la selección argentina, de la que es capitán",
    )
  end

  before { Celebrity.reindex }

  scenario "It should render the matching celebrities" do
    visit celebrities_path

    expect(page).to have_content("Juanes")
    expect(page).to have_content("Shakira")

    expect(page).not_to have_content("Lina Tejeiro")

    within(".pagination") do
      find(:css, "li.next a").click
      wait_for_ajax
    end

    expect(page).to have_content("Lina Tejeiro")
    expect(page).to have_content("Alejandro Fernandez")

    fill_in "search_celebrity", with: "colom"
    wait_for_ajax

    within(".react-autosuggest__container") do
      expect(page).to have_content("Juanes")
      expect(page).to have_content("Shakira")
      expect(page).not_to have_content("Alejandro")
      expect(page).not_to have_content("Lina")
      expect(page).not_to have_content("Messi")
    end

    fill_in "search_celebrity", with: "shakora"
    wait_for_ajax

    expect(page).to have_content("Quisiste decir? shakira")

    fill_in "search_celebrity", with: "messi"
    wait_for_ajax

    expect(page).to have_content("Leo messi")
    expect(page).not_to have_content("Juanes")
    expect(page).not_to have_content("Shakira")
    expect(page).not_to have_content("Alejandro")
    expect(page).not_to have_content("Lina")

  end

end
