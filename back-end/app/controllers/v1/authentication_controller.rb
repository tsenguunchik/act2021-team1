require 'json_web_token'

class V1::AuthenticationController < ApplicationController
  include JsonWebToken
  before_action :authorize_request, only: [:logout]

  def login
    if params[:email].nil? || params[:password].nil?
      return respond('Missing params', :unauthorized, 4013)
    end
    user = User.where(deleted_at: nil).find_by_email(params[:email].downcase)
    if user && !user.confirmation_status
      respond('Login is limited to confirmed accounts only', :unauthorized, 4011)
    elsif user&.password_digest.present?
      if user.authenticate(params[:password]) 
        render json: JsonWebToken.get_tokens({user_id: user.id, is_social: false}).to_json, status: :ok
      else
        respond('The email address or password is incorrect.', :unauthorized, 4012)
      end
    else
      respond('Unregistered email address', :unauthorized, 4012)
    end
  end

  def refresh_token
    decoded = JsonWebToken.decode_refresh_token(params[:refresh_token])
    user = User.where(deleted_at: nil).find(decoded[:user_id])
    if decoded[:token_at].present? 
      jwt_blacklist = JwtBlacklist.where(user_id: user.id , token_at: decoded[:token_at]).last
      if jwt_blacklist.present?
        return respond('Invalid token', :unauthorized, 401)
      end
    end
    render json: JsonWebToken.get_tokens({user_id: user.id, is_social: decoded[:is_social]}).to_json, status: :ok
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    respond('Invalid token', :unauthorized, 401)
  end

  def forgot_password
    user = User.where(deleted_at: nil).find_by_email(params[:email].downcase)
    if user.present?
      if user&.confirmation_status
        user.update!(sign_in_failed: 0, locked_at: nil) if user.locked_at.present?
        user.update!(confirmation_code: rand.to_s[2..7], password_reset_sent_at: Time.now.utc)
        UserMailer.reset_password(user).deliver_now!
        render json: { success: 'confirmation code sent' }, status: :ok
      elsif !user&.confirmation_status
        respond('Login is limited to confirmed accounts only.', :unauthorized, 4011)
      end
    else
      respond('Unregistered email address', :unprocessable_entity, 4012)
    end
  end

  def logout
    begin
      header = request.headers['authorization']
      if header.present?
        header = header.split(' ').last 
        @decoded = JsonWebToken.decode(header)
        jwt_blacklist = JwtBlacklist.new
        jwt_blacklist.user_id = @current_user.id
        jwt_blacklist.jwt = header
        if @decoded.present?
          jwt_blacklist.is_social = @decoded['is_social'] if @decoded['is_social']
          jwt_blacklist.exp = @decoded['exp'] if @decoded['exp'].present?
          jwt_blacklist.token_at = @decoded['token_at'] if @decoded['token_at'].present?
        end
        jwt_blacklist.save!
      end
    rescue Exception => e
      Rails.logger.error "Logout Error :: #{e}"
    end
    render json: { status: "ok" }, status: :ok
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end
