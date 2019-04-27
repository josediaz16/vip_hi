module Common
  module Operations
    Persist = PersistBuilder.(-> model, attributes { model.new(attributes) })
  end
end
