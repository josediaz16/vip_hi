module Users
  class CreateCelebrity
    include AppConfig::Transaction.new container: Celebrities::Container

    step :create_user,     with: "ops.create_celebrity_user"
    tee  :add_role,        with: "ops.add_role"
    tee  :create_specific, with: "ops.create_celebrity"

    def call(input)
      super(input, &Common::Utils.plain_hooks)
    end
  end
end
