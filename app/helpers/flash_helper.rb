module FlashHelper
  Icons = {
    notice:  'icon-information',
    info:    'icon-information',
    alert:   'icon-exclamation',
    error:   'icon-exclamation',
    success: 'icon-checkmark'
  }

  def flash_box(key, value)
    options = {
      String  => simple_flash
    }
    options.default = -> _, _ { nil }
    options[value.class].(key.to_sym, value)
  end

  private

  def simple_flash
    -> key, value { render "shared/alert", alert_class: "alert-box--#{key}", icon_class: Icons[key], message: value }
  end
end
