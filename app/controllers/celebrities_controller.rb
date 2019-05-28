class CelebritiesController < ApplicationController
  skip_before_action :authenticate_user!, only: :index

  def new
  end

  def index
    respond_to do |format|
      format.html { render_component }
      format.json { render json: search_celebrities }
    end
  end

  private

  def render_component
    @initial_results = Celebrities::Search.("*")
  end

  def search_celebrities
    Celebrities::Search.(params[:query])
  end
end
