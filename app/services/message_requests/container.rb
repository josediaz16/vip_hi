module MessageRequests
  class Container < Common::Container
    namespace("ops") do
      register "validate", Common::Operations::Validate.new(validator: Validators::MessageRequests::Create)
      register "persist",  Common::Operations::Persist.new(model_class: MessageRequest)
    end
  end
end
