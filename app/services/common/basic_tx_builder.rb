module Common
  BasicTxBuilder = -> validator, model do
    Class.new do
      container = Common::BasicContainerBuilder.(validator, model)

      include AppConfig::Transaction.new(container: container)

      step :validate,     with: 'ops.validate'
      map  :parse_input,  with: 'ops.default_parse_input'
      step :persist,      with: 'ops.persist'
    end
  end
end
