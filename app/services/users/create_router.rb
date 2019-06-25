module Users
  UserOpts = {
    fan: CreateFan,
    celebrity: CreateCelebrity
  }

  CreateRouter = -> role:, **input do
    UserOpts[role.to_sym]
      .new(create_specific: Fns::DoNothing)
      .(input)
  end
end
