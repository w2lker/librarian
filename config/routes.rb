Rails.application.routes.draw do
  get 'static/index'
  namespace :api do
    resources :books, only: [:index, :show, :create, :update, :destroy]

    resources :topics, only: [:index, :create, :update, :destroy] do
      collection do
        get 'search'
      end
    end

    get 'unique_tags', to: 'topics#unique_tags'
  end

  root to: 'static#index'
end
