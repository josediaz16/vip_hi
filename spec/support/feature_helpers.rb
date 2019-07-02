module Support
  module FeatureHelpers
    def sign_in_user(user)
      visit new_user_session_path
      fill_in_sign_in_form(user)
    end

    def fill_in_sign_in_form(user)
      fill_in "user[email]", with: user.email
      fill_in "user[password]", with: user.password
      click_on "Inicia sesión"
    end

    def wait_for_ajax
      Timeout.timeout(Capybara.default_max_wait_time) do
        active = page.evaluate_script('jQuery.active')
        until active == 0
          active = page.evaluate_script('jQuery.active')
        end
      end
    end
  end
end
