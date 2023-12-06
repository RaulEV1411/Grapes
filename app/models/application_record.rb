class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
end
