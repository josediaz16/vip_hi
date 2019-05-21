Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  devise_for :users, controllers: {registrations: "users/registrations", confirmations: "users/confirmations"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_scope :user do
    resource :confirmation_alert, controller: "confirmation_alert", only: [:show]
  end

  root to: 'home#index'

  resources :celebrities, only: [:new]
  namespace :admins do
    resources :celebrities, only: [:new, :create, :index]
  end
end
