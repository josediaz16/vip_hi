module General
  module Format
    def self.coerce_date(date)
      case date
      when Time, DateTime, Date
        date
      when String
        Time.parse(date)
      end
    end

    ParseJqueryParams = -> some_params do
      some_params.each_with_object({}) do |(key, object), hash|
        hash[key.to_sym] = ParseJqueryArray.(object)
      end
    end

    ParseFakeHash = -> object do
      if object.keys.first.to_s.match(/\d/)
        object.values.map(&FixJqueryArray)
      else
        ParseJqueryParams.(object)
      end
    end

    RecursiveParse = -> fn, value do
      case value
      when Hash
        fn.(value)
      else
        value
      end
    end.curry

    ParseJqueryArray = RecursiveParse.(ParseFakeHash)
    FixJqueryArray = RecursiveParse.(ParseJqueryParams)
  end
end
