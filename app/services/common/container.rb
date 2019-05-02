module Common
  class Container
    extend Dry::Container::Mixin

    register("ops.default_parse_input") do
      -> input do
        {attributes: input, original: input}
      end
    end

  end
end
