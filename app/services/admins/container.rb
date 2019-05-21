module Admins
  class Container < Common::Container
    namespace("ops") do
      register("create_user", Users::Create.new(
        validate: Common::Operations::Validate.new(validator: Validators::Users::CreateAdmin)
      ))
    end
  end
end
