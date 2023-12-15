Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api do
    namespace :v1 do
      resources :users do
        member do
          post 'approve_admin'
          post 'request_admin'
          delete 'decline_request'
        end
      end
      resources :contents do
        collection do
          get 'contents_by_course'
        end
      end
      resources :subjects 
      resources :courses do 
        member do 
          get 'courses_by_teacher'
          get 'courses_by_subject'
        end
      end
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
