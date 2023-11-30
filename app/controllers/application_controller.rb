class ApplicationController < ActionController::API
    # include ActionController::HttpAuthentication::Token::ControllerMethods
    include ActionController::MimeResponds

    respond_to :json
    before_action :authenticate_user!
    before_action :configure_permitted_parameters, if: :devise_controller?

protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_in) do |user_params|
            user_params.permit(:email, :password)
        end
        devise_parameter_sanitizer.permit(:sign_up) do |user|
            user.permit(:email, :password,)
        end
    end

    def authenticate_request
        @current_user = AuthorizeApiRequest.call(request.headers).result
        render json: { error: 'Not Authorized' }, status: 401 unless @current_user
    end
end
