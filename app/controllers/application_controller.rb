class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :set_language

  def set_language
    I18n.locale = params[:lang] || :es
  end

  # TODO: Move this logic to service
  def after_sign_in_path_for(user)
    if params[:origin].present?
      params[:origin]
    else
      options = {
        [:admin] => new_admins_celebrity_path,
        [:celebrity] => new_celebrity_path,
        [:fan]   => celebrities_path
      }
      roles = user.roles.names_ordered.map(&:to_sym)
      options[roles]
    end
  end

  def json_service(service, input, &block)
    result = JqueryParamsWrapper.(service, input)

    if result.success?
      model = result.success[:model]
      blueprint = {record: BlueprintContainer[model.class].render_as_hash(model)}

      json_data = block_given? ? yield(result.success, blueprint) : blueprint
      render json: json_data, status: 200
    else
      render json: result.failure, status: 422
    end
  end

  def default_url_options
    {lang: I18n.locale}
  end
end
