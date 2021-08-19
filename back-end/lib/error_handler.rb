# Error module to Handle errors globally
# include Error::ErrorHandler in application_controller.rb
module ErrorHandler
  def self.included(clazz)
    clazz.class_eval do
      rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    end
  end

  def render_unprocessable_entity_response(exception)
    respond(exception.message, :unprocessable_entity, 422)
  end

  def render_not_found_response(exception)
    respond(exception.message, :not_found, 404)
  end

  private

  def respond(_message, _status, _error_code)
    render json: { error: { message: _message, code: _error_code} }, status: _status
  end
end
