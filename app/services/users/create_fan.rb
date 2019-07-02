module Users
  class CreateFan
    include AppConfig::Transaction.new container: Celebrities::Container

    step :create_user,     with: "ops.create_fan_user"
    tee  :add_role,        with: "ops.add_fan_role"
    tee  :create_specific, with: "ops.create_fan"

    def call(input)
      super(input, &Common::Utils.plain_hooks)
    end
  end
end
