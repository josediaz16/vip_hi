module Users
  class Container < Common::Container
    namespace("ops") do
      register "find_country", Fns::H::RenameKey.(:country, :country_id, Countries::FindByCodeIso)
      register "validate", Common::Operations::Validate.new(validator: Validators::Users::CreateCelebrity)
      register "persist",  Common::Operations::Persist.new(model_class: User)
    end
  end
end
