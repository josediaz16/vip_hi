class BlueprintContainer
  extend Dry::Container::Mixin

  register(User, UserBlueprint)
  register(MessageRequest, MessageRequestBlueprint)
end
