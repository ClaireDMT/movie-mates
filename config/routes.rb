Rails.application.routes.draw do
  root to: 'pages#app'

  get '/current_user', to: 'users/current_user#index'
  get '/authorized?', to: 'users/sessions#show'

  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
            }


  namespace :api do
    namespace :v1 do
      resources :movies, only: [:index, :show]
      resources :crews, only: [:index, :show]
      resources :genres, only: [:index]
      resources :users, only: [:friends]
    end
  end

  require "sidekiq/web"
  authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  get '*path', to: 'pages#app', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
