require 'json_web_token'

class V1::SignupController < ApplicationController
  include JsonWebToken

  def register
    return respond('user registration failed', :unauthorized, 4016) if params[:email].nil? || params[:password].nil?

    @user = User.find_by_email(params[:email].downcase)
    if @user.present? && !@user.confirmation_status
      @user.update!(password: params[:password])
      send_email
      render json: @user.as_json(only: %w[email]), status: :created
    elsif @user.present? && @user.only_social_user?
      respond('Only social authenticated', :unauthorized, 4015)
    else
      @user = User.new(signup_params)
      @user.save!
      send_email
      render json: @user.as_json(only: %w[email]), status: :created
    end
  end

  def confirm_code
    user = User.where(deleted_at: nil).find_by_email(params[:email].downcase)
    if user.present? && user.confirmation_code_valid?
      unless params[:confirmation_code].to_s.eql? user.confirmation_code
        return respond('Confirmation code not match', :unauthorized, 4014)
      end
      user.update!(confirmation_code: nil, confirmation_status: 1, confirmation_sent_at: nil)
      render json: JsonWebToken.get_tokens({user_id: user.id, is_social: false}).to_json, status: :ok
    else
      respond('Confirmation code expired', :unauthorized, 4013)
    end
  end

  def confirm_reset
    user = User.find_by_email(params[:email].downcase)
    return respond('Unregistered email address', :unauthorized, 4012) unless user.present?
    return respond('Confirmation code expired', :unauthorized, 4013) unless user.password_code_valid?

    if params[:confirmation_code].to_s.eql? user.confirmation_code
      render json: { success: 'confirmed' }, status: :ok
    else
      respond('Confirmation code not match',:unauthorized, 4014)
    end
  end

  def resend_code
    @user = User.find_by_email(params[:email].downcase)
    respond('Unregistered email address', :unauthorized, 4012) unless @user.present?

    if params[:type] == "register" && !@user.confirmation_status
      @user.update!(confirmation_code: rand.to_s[2..7], confirmation_sent_at: Time.now.utc)
      UserMailer.registration_confirmation(@user).deliver_now!
      render json: { success: 'confirmation code sent' }, status: :ok
    elsif params[:type] == "reset_password"
      @user.update!(confirmation_code: rand.to_s[2..7], password_reset_sent_at: Time.now.utc)
      UserMailer.reset_password(@user).deliver_now!
      render json: { success: 'confirmation code sent' }, status: :ok
    else
      respond('Unregistered email address', :unauthorized, 4012)
    end
  end

  private

  def signup_params
    params.permit(:email, :password, :first_name, :last_name)
  end

  def send_email
    @user.update!(confirmation_code: rand.to_s[2..7], confirmation_sent_at: Time.now.utc)
    begin
      UserMailer.registration_confirmation(@user).deliver_now!
    rescue StandardError => e
      Rails.logger.error "---sign up mailer--->#{e}--->"
    end
  end
end
