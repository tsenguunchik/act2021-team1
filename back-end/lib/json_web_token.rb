module JsonWebToken
  SECRET_KEY = ENV['SECRET_KEY_BASE'].to_s
  REFRESH_TOKEN_SECRET_KEY = ENV['REFRESH_TOKEN_SECRET_KEY_BASE'].to_s

  def self.encode(payload, exp)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.encode_refresh_token(payload, exp)
    payload[:exp] = exp.to_i
    JWT.encode(payload, REFRESH_TOKEN_SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end

  def self.decode_refresh_token(token)
    decoded = JWT.decode(token, REFRESH_TOKEN_SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end

  def self.get_tokens(payload)
    payload[:token_at] = Time.now.to_i
    access_token = JsonWebToken.encode(payload, 24.hour.from_now)
    refresh_token = JsonWebToken.encode_refresh_token(payload, 15.days.from_now)
    user = User.find(payload[:user_id])
    expires_at = (24.hour.from_now.to_f * 1000).to_i
    {
      id: user.id,
      email: user.email,
      accessToken: access_token,
      refreshToken: refresh_token,
    }
  end
end
