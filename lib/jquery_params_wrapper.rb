JqueryParamsWrapper = -> transaction, params do
  parsed_params = General::Format::ParseJqueryParams.(params)
  transaction.(parsed_params)
end.curry
