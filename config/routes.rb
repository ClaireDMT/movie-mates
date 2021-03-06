Rails.application.routes.draw do
  root to: 'pages#app'

  # get '/current_user', to: 'users/current_user#index'
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }


  namespace :api do
    namespace :v1 do
      resources :crews, only: [:index, :show]
      resources :genres, only: [:index]
      resources :screenings, only: [:create, :show] do
        resources :screening_genres, only: [:create]
        resources :movies, only: [:index]
        resources :screening_movies, only: [:create]
      end
      get '/friends', to: 'users#friends'
      get 'screenings/:id/matches', to: 'screenings#matches'
      resources :user_movies, only: [:create, :index]
    end
  end

  require "sidekiq/web"
  # authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  # end

  get '*path', to: 'pages#app', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
