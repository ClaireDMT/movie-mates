class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # def create
  #   build_resource(sign_up_params)

  #   resource.save
  #   render_resource(resource)
  # end

  def new
    render(status: :bad_request) && return if User.exists?(email: sign_up_params['email'])

    build_resource(sign_up_params)
    resource.save
    render_resource(resource)
  end

  # POST /resource
  def create
    render(status: :bad_request) && return if User.exists?(email: sign_up_params['email'])

    build_resource(sign_up_params)
    resource.save
    render_resource(resource)
  end

  private

  def respond_with(resource, _opts = {})
    # register_success && return if resource.persisted?
    render json: resource

    # register_failed
  end

  def register_success
    render json: { message: 'Signed up sucessfully.' }
  end

  def register_failed
    render json: { message: "Something went wrong." }
  end
end

