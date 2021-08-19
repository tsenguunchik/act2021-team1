class User < ApplicationRecord
  require 'securerandom'
  has_secure_password(validations: false)

  before_save :downcase_email
  
  validates :email, uniqueness: { case_sensitive: false }, length: { maximum: 100 }, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i }
  validates :password, length: { minimum: 8 }, allow_blank: true
  validates :confirmation_code, length: { maximum: 6 }

  def confirmation_code_valid?
    confirmation_sent_at.present? && (confirmation_sent_at + 10.minutes) > Time.now.utc
  end

  def password_code_valid?
    return false unless password_reset_sent_at.present?
    (password_reset_sent_at + 10.minutes) > Time.now.utc
  end

  def reset_password!(password)
    self.confirmation_code = nil 
    self.password_reset_sent_at = nil
    self.password = password
    save!
  end

  def downcase_email
    email&.downcase!
  end
end
