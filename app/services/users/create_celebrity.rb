module Users
  class CreateCelebrity
    include AppConfig::Transaction.new container: Celebrities::Container

    step :create_user, with: "ops.create_user"
    tee  :add_role
    tee  :create_celebrity

    def call(input)
      super(input, &Common::Utils.plain_hooks)
    end

    def add_role(input)
      role = Role.find_by(name: "celebrity")
      UserRole.create(role_id: role.id, user_id: input[:model].id)
    end

    def create_celebrity(input)
      Celebrity.create(user_id: input[:model].id, biography: input.dig(:original, :biography).to_s)
    end

  end
end
