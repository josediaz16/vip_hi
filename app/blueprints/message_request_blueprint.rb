class MessageRequestBlueprint < Blueprinter::Base
  identifier :id
  fields :from, :to, :email_to, :brief
end
