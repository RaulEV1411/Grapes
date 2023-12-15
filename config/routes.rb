# This file defines the routes in your Rails application.
# Routes determine how URLs map to controllers and actions.

Rails.application.routes.draw do
  # This line sets up routes for user authentication with Devise.
  # The :defaults option sets the default format for these routes to JSON.
  # The :path option sets the base path for these routes to the root path.
  # The :path_names option customizes the path names for these routes.
  # The :controllers option specifies custom controllers for the sessions and registrations routes.
  devise_for :users, defaults: { format: :json }, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # This block defines a set of routes under the /api/v1 path.
  # These routes map to actions in controllers in the Api::V1 module.
  namespace :api do
    namespace :v1 do
      # This line sets up standard RESTful routes for the users resource.
      # The block defines additional member routes that apply to individual users.
      resources :users do
        member do
          post 'approve_admin'
          post 'request_admin'
          delete 'decline_request'
        end
      end
      # This line sets up standard RESTful routes for the contents resource.
      # The block defines additional collection routes that apply to all contents.
      resources :contents do
        collection do
          get 'contents_by_course'
        end
      end
      # This line sets up standard RESTful routes for the subjects resource.
      resources :subjects 
      # This line sets up standard RESTful routes for the courses resource.
      # The block defines additional member routes that apply to individual courses.
      resources :courses do 
        member do 
          get 'courses_by_teacher'
          get 'courses_by_subject'
        end
      end
      # This line sets up standard RESTful routes for the requests resource.
      # The block defines additional collection and member routes.
      resources :requests do
        get 'index_request_pending', on: :collection
        get 'index_request_approved', on: :collection
        member do
          get 'show_by_user'
        end
      end
    end
  end
end