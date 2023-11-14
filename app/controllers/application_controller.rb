class ApplicationController < ActionController::API
    before_action :authenticate_user!
    before_action :configure_permitted_parameters, if: :devise_controller?
    
    protected
    
    def configure_permitted_parameters
        attributes = [:last_name, :first_name, :birth_date]
        devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
        devise_parameter_sanitizer.permit(:sign_up, keys: %i[name avatar ])
        devise_parameter_sanitizer.permit(:account_update, keys: %i[name avatar])
    end

end
