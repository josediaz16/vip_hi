module Celebrities
  class Container < Common::Container
    ParseInput = -> input do
      {attributes: input.except(:biography, :price, :handle), original: input}
    end

    namespace("ops") do
      register("create_celebrity_user", Users::Create.new(parse_input: ParseInput))
      register("create_fan_user",       Users::Create.new(
        parse_input: ParseInput,
        validate: Common::Operations::Validate.new(validator: Validators::Users::CreateFan)
      ))

      register("add_role",     Users::Ops::AddRole.new)
      register("add_fan_role", Users::Ops::AddRole.new(role_name: "fan"))

      register("create_fan", -> input do
        Fan.create(user_id: input[:model].id)
      end)

      register("create_celebrity", -> input do
        Celebrities::Create.(user_id: input[:model].id, **input[:original].slice(:biography, :price, :handle))
      end)

      register("validate_complete_profile", Common::Operations::Validate.new(validator: Validators::Celebrities::Complete))
      register("complete_celebrity_profile", Common::Operations::Persist.new(model_class: Celebrity))
    end
  end
end
