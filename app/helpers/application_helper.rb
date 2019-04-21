module ApplicationHelper
  def component_translations(component_name, deep_resolve: false)
    root = "components.#{component_name}"
    if deep_resolve
      I18n.t root
    else
      ::Translations::ComponentResolver.(root)
    end
  end
end
