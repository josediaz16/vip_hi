class Presenters::CelebritiesPresenter < Presenters::BasePresenter
  def json_data
    CelebrityBlueprint.render_as_hash(source, view: :normal)
  end

  def payu_data
    {
      confirmationUrl: "http://3329338c.ngrok.io/payments/confirmation",
      paymentUrl: ENV["PAYU_URL"],
      merchantId: ENV["PAYU_MERCHANTID"],
      accountId:  ENV["PAYU_ACCOUNTID"],
      amount:     source.price,
      test:       is_test?
    }
  end

  def is_test?
    Rails.env.production? ? "0" : "1"
  end

end
