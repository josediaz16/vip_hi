source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'rails', '~> 5.2.3'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'figaro'

# Assets Related
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

# Authentication
gem 'devise'

# Views and Html
gem "haml-rails", "~> 2.0"
gem "kaminari"

# React and webpack
gem 'webpacker'
gem 'react-rails'

# Countries Db
gem 'countries'

# JSON rendering
gem 'blueprinter'

# Dry Gems
gem 'dry-auto_inject'
gem 'dry-validation'
gem 'dry-transaction'

# Elasticsearch
gem 'searchkick'

# State Machine
gem 'statesman'

# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'letter_opener_web', '~> 1.0'
  gem "capistrano", "~> 3.11", require: false
end

group :test do
  gem 'rspec-rails', '~> 3.8'
  gem 'capybara', '>= 2.15'
  gem "capybara-email"
  gem 'selenium-webdriver'
  gem 'factory_bot_rails'
  gem "faker"
end
