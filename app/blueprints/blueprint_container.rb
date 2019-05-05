class BlueprintContainer
  extend Dry::Container::Mixin

  register(User, UserBlueprint)
end
