class DeviseMailer < Devise::Mailer
  layout 'alt_mailer'
  helper :application

  include Devise::Controllers::UrlHelpers
end
