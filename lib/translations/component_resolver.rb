module Translations
  ComponentResolver = -> root, translations = nil do
    translations ||= I18n.t(root)

    translations.each_with_object({}) do |(key, value), hash|
      case value
      when String, Symbol
        if value.to_s.match(/components\.\w+/).present?
          hash[key] = ComponentResolver.(value)
        else
          hash[key] = value
        end
      when Hash
        hash[key] = ComponentResolver.(root, value)
      end
    end
  end
end
