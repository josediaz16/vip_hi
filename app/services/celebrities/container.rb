module Celebrities
  class Container < Common::Container
    namespace("ops") do
      register("create_user", Users::Create.new(
        parse_input: -> input { {attributes: input.except(:biography), original: input} }
      ))
    end
  end
end
