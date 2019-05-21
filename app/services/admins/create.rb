module Admins
  class Create
    include AppConfig::Transaction.new container: Admins::Container

    step :create_user, with: "ops.create_user"
    tee :add_role
    tee :create_admin

    def call(input)
      super(input, &Common::Utils.plain_hooks)
    end

    def add_role(input)
      role = Role.find_by(name: "admin")
      UserRole.create(role_id: role.id, user_id: input[:model].id)
    end

    def create_admin(input)
      Admin.create(user_id: input[:model].id)
    end
  end
end
