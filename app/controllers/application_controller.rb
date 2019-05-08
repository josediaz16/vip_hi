class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def json_service(service, input, &block)
    result = JqueryParamsWrapper.(service, input)

    if result.success?
      model = result.success[:model]
      blueprint = {record: BlueprintContainer[model.class].render_as_hash(model)}

      json_data = block_given? ? yield(blueprint, result.success) : blueprint
      render json: json_data, status: 200
    else
      render json: result.failure, status: 422
    end

  end
end
