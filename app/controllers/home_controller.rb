class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @results = {
      most_recent: Celebrities::Search.("*", order: {created_at: :desc}, per_page: 6, page: 0, &add_celebrity_path)
    }
  end

  def add_celebrity_path
    -> result { result.merge detail_path: celebrity_path(result["id"]) }
  end
end
