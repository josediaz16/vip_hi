module Common
  BasicContainerBuilder = -> validator, model do
    Class.new(Common::Container) do
      namespace("ops") do
        register("validate", Common::Operations::Validate.new(validator: validator))
        register("persist",  Common::Operations::Persist.new(model_class: model))
      end
    end
  end
end
