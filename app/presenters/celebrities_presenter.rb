class Presenters::CelebritiesPresenter < Presenters::BasePresenter
  def json_data
    CelebrityBlueprint.render_as_hash(source, view: :normal)
  end
end
