Rails.application.routes.draw do
  namespace :api do
    resources :books, only: [:index, :show, :create, :update, :destroy]

    resources :topics, only: [:index, :create, :update, :destroy] do
      collection do
        get 'search'
      end
    end

    get 'unique_tags', to: 'topics#unique_tags'
  end

  get '*path', to: 'fallback#index', constraints: ->(request) { !request.xhr? && request.format.html? }
  root to: 'fallback#index'
end
