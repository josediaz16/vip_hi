class CelebritiesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]

  def new
  end

  def show
    @presenter = Presenters::CelebritiesPresenter.new Celebrity.find(params[:id])
  end

  def index
    respond_to do |format|
      format.html { render_component }
      format.json { render json: search_celebrities }
    end
  end

  private

  def render_component
    @initial_results = Celebrities::Search.(params[:search] || "*", &add_celebrity_path)
  end

  def search_celebrities
    Celebrities::Search.(params[:query], params.permit(:page, :per_page).to_h, &add_celebrity_path)
  end

  def add_celebrity_path
    -> result { result.merge detail_path: celebrity_path(result["id"]) }
  end
end
