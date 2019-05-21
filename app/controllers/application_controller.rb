class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def after_sign_in_path_for(user)
    options = {
      [:admin] => new_admins_celebrity_path
    }
    roles = user.roles.names_ordered.map(&:to_sym)

    options[roles]
  end

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
