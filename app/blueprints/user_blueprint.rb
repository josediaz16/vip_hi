class UserBlueprint < Blueprinter::Base
  identifier :id
  fields :email, :name, :known_as, :country_id
end
