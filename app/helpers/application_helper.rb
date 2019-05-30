module ApplicationHelper
  def component_translations(component_name, deep_resolve: true)
    root = "components.#{component_name}"
    if deep_resolve
      ::Translations::ComponentResolver.(root)
    else
      I18n.t root
    end
  end
end
