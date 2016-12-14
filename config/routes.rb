Rails.application.routes.draw do
  root 'dashboard#index'

  namespace :api do
    resources :books, only: [:index, :create , :update, :destroy] do
      collection do
        get :search
      end
    end
  end
end
