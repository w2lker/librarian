Rails.application.routes.draw do
  namespace :api do
    resources :books, only: [:index, :show, :create, :update, :destroy]
    resources :topic, only: [:index, :show, :create, :update, :destroy]
  end

  get '*path', to: 'fallback#index', constraints: ->(request) { !request.xhr? && request.format.html? }
  root to: 'fallback#index'
end