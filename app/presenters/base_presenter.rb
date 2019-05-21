require 'dry/monads/maybe'

class Presenters::BasePresenter < SimpleDelegator
  include ActionView::Helpers

  attr_reader :source, :errors

  def initialize(source, errors: [])
    @source = source
    @errors = errors
    super(source)
  end

  def content_error(field)
    field_error = errors.find { |error| error[:field].to_sym.eql?(field) }

    Dry::Monads.Maybe(field_error)
      .fmap(&Fns::Fetch.(:description))
      .fmap { |value| content_tag(:span, value, class: "input-error") }
      .value_or(nil)
  end
end
