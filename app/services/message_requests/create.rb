module MessageRequests
  class Create
    include AppConfig::Transaction.new container: MessageRequests::Container

    step :validate,    with: "ops.validate"
    map  :parse_input, with: "ops.default_parse_input"
    step :persist,     with: "ops.persist"
  end
end
