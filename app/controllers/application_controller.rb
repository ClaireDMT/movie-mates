class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    # For additional fields in app/views/devise/registrations/new.html.erb
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])

    # For additional in app/views/devise/registrations/edit.html.erb
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name])
  end

  def jwt_key
    ENV['DEVISE_JWT_SECRET_KEY']
  end

  def issue_token(user)
    JWT.encode({ user_id: user.id }, jwt_key, 'HS256')
  end

  def decoded_token
    begin
      JWT.decode(token, jwt_key, true, { algorithm: 'HS256' })
    rescue JWT::DecodeError
      [{error: "Invalid Token"}]
    end
  end

  def token
    request.headers['Authorization']
  end

  def user_id
    decoded_token.first['user_id']
  end

  # def current_user
  #   @user ||= User.find_by(id: user_id)
  # end

  def logged_in?
    !!current_user
  end

  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: [
        {
          status: '400',
          title: 'Bad Request',
          detail: resource.errors,
          code: '100'
        }
      ]
    }, status: :bad_request
  end
end
