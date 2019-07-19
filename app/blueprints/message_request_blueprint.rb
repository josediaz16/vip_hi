class MessageRequestBlueprint < Blueprinter::Base
  identifier :id
  fields :from, :to, :phone_to, :brief
end
