Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "application#welcome"

  namespace :v1, defaults: {format: 'json'} do
    post '/signup/register', to: 'signup#register'
    post '/signup/confirm', to: 'signup#confirm_code'
    post '/signup/resend_code', to: 'signup#resend_code'
    post '/auth/login', to: 'authentication#login'
    post '/auth/refresh_token', to: 'authentication#refresh_token'
    post '/auth/logout', to: 'authentication#logout'
  end
end
