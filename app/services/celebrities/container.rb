module Celebrities
  class Container < Common::Container
    namespace("ops") do
      register("create_user", Users::Create.new)
    end
  end
end
