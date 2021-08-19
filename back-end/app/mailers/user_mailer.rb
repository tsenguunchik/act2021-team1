class UserMailer < ApplicationMailer
  default from: 'nasanjargal@amsa.mn'

  def registration_confirmation(user)
    @user = user
    mail(subject: 'Confirmation code', to: @user.email)
  end

  def reset_password(user)
    @user = user
    mail(subject: 'Reset password', to: @user.email)
  end

  def reset_password_complete(user)
    @user = user
    mail(subject: 'Reset password complete', to: @user.email)
  end
end
