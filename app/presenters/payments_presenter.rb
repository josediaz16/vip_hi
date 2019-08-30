require 'dry/monads/maybe'

class Presenters::PaymentsPresenter < Presenters::BasePresenter
  def price
    number_to_currency(params[:TX_VALUE], delimiter: ".", precision: 0, unit: "COP $")
  end

  def email
    params[:buyerEmail]
  end

  def date
    Dry::Monads.Maybe(params[:processingDate])
      .fmap(Time.method(:parse))
      .fmap { |time| time.strftime("%b %d %Y") }
      .value_or("N/A")
  end

  def formatted_now
    Time.now.strftime("%b %d, %Y %H:%M:%S")
  end

  def celebrity_name
    celebrity.user.known_as
  end

  def recipient
    from.presence || to
  end

  def transaction_approved?
    params[:lapTransactionState].eql?("APPROVED")
  end
end
