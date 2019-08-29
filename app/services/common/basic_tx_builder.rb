module Common
  BasicTxBuilder = -> validator, model, &block do
    Class.new do
      container = Common::BasicContainerBuilder.(validator, model)

      include AppConfig::Transaction.new(container: container)

      step :validate,     with: 'ops.validate'
      map  :parse_input,  with: 'ops.default_parse_input'
      step :persist,      with: 'ops.persist'

      class_eval(&block) if block.present?
    end
  end
end
