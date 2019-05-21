module Celebrities
  class Create
    include AppConfig::Transaction.new container: Celebrities::Container

    step :create_user, with: "ops.create_user"
    tee :add_role

    def call(input)
      super(input, &Common::Utils.plain_hooks)
    end

    def add_role(input)
      role = Role.find_by(name: "celebrity")
      UserRole.create(role_id: role.id, user_id: input[:model].id)
    end

  end
end
