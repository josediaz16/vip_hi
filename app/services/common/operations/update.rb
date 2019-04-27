module Common
  module Operations
    FindAndUpdate = -> model_class, attrs do
      model_class
        .find(attrs[:id]).tap do |record|
        record.assign_attributes(attrs.except(:id))
      end
    end

    Update = PersistBuilder.(FindAndUpdate)
  end
end
