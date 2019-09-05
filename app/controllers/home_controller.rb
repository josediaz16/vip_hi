class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @results = {
      initial_results: Celebrities::Search.(params[:search] || "*", &add_celebrity_path),
      favorites: Celebrities::Search.("*", per_page: 8, page: 0, &add_celebrity_path)
    }
  end

  def legal
  end

  def protection_policy
  end

  def add_celebrity_path
    -> result { result.merge detail_path: celebrity_path(result["id"]) }
  end
end
