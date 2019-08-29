module Celebrities
  Create = Common::BasicTxBuilder.(Validators::Celebrities::Create, Celebrity) do
    tee :index_account

    def index_account(input)
      input[:model].reindex
    end
  end
end
