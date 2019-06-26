module Users
  UserOpts = {
    fan: CreateFan.new,
    celebrity: CreateCelebrity.new(create_specific: Fns::DoNothing)
  }

  CreateRouter = -> role:, **input do
    UserOpts[role.to_sym].(input)
  end
end
