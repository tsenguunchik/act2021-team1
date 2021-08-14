class ApplicationController < ActionController::API
  def welcome
    render json: { msg: "welcome1" }, status: :ok
  end
end
