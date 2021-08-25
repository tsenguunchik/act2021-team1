require 'error_handler'
require 'json_web_token'

class ApplicationController < ActionController::API
  include ErrorHandler
  include JsonWebToken

  def authorize_request
    auth_header = request.headers['authorization']
    token = auth_header.split(' ').last 
    @decoded = JsonWebToken.decode(token)
    if @decoded.present? && @decoded[:token_at].present? && @decoded[:user_id].present?
      token_at = @decoded[:token_at].to_s
      user_id = @decoded[:user_id].to_i
      jwt_blacklist = JwtBlacklist.where(token_at: token_at, user_id: user_id).first
      if jwt_blacklist.present?
        return respond('Invalid token', :unauthorized, 401)
      end
    end
    @current_user = User.where(deleted_at: nil).find(@decoded[:user_id])
  rescue JWT::ExpiredSignature
    respond('Token expired', :unauthorized, 4010)
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    respond('Invalid token', :unauthorized, 401)
  rescue StandardError => e
    @auth_logger||= Logger.new("#{Rails.root}/log/auth_#{Time.now.strftime("%m-%d-%y")}.log")
    @auth_logger.info "----- Auth LOG BEGIN -------"
    @auth_logger.info "------Authorization #{request.headers['authorization']}"
    @auth_logger.info "------Error #{e.message}"
    @auth_logger.info "----- Auth LOG END -------"
    respond('Invalid token', :unauthorized, 401)
  end

  def welcome
    render json: { msg: "welcome" }, status: :ok
  end

  def route_not_found!
    render json: { msg: "route not found" }, status: :not_found
  end
end
