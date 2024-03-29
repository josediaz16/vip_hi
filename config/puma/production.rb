workers 9

# Min and Max threads per worker
threads 1, 6

app_dir = "/var/www/saludos_famosos/current"
shared_dir = "/var/www/saludos_famosos/shared" # shared is outside of vagrant since there is some permission problem if is inside /vagrant

# Default to production
rails_env = ENV['RAILS_ENV'] || "production"
environment rails_env

# Set up socket location
bind ENV["SOCKET"] #"unix://#{shared_dir}/sockets/puma.sock"

# Logging
stdout_redirect "#{shared_dir}/log/puma.stdout.log", "#{shared_dir}/log/puma.stderr.log", true

# Set master PID and state locations
pidfile ENV["PID_FILE"] #"#{shared_dir}/pids/puma.pid"

activate_control_app

on_worker_boot do
  require "active_record"
  ActiveSupport.on_load(:active_record) do
    ActiveRecord::Base.establish_connection
  end
end
