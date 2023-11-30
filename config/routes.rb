Rails.application.routes.draw do
  get 'private/test'
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
        end
      end
      resources :subjects 
      resources :courses
      resources :requests, only: [:index, :show, :new, :create]
    end
  end

end
