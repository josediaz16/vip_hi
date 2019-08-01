class Presenters::PaymentsPresenter < Presenters::BasePresenter
  def price
    number_to_currency(params[:TX_VALUE], delimiter: ".", precision: 0, unit: "COP $")
  end

  def email
    params[:buyerEmail]
  end

  def date
    Time.parse(params[:processingDate]).strftime("%b %d %Y")
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
end
