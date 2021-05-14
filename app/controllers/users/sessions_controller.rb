class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(email: login_params[:email])
    if user&.valid_password?(login_params[:password])
      token = issue_token(user)
      render json: { valid: "true", user: { id: user.id, email: user.email }, token: token }
    else
      render json: { valid: "false", errorMessages: { login: "username or password is wrong" } }
    end
  end

  def show
    if logged_in?
      render json: { valid: "true", user: {id: current_user.id } }
    else
      render json: { valid: "false", errorMessages: {session: "Please login to continue"}}
    end
  end

  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end

  def login_params
    params.require(:user).permit(:email, :password)
  end

end
