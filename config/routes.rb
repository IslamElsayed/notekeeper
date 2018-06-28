Rails.application.routes.draw do
  devise_for :users
  resources :notes do
    resources :users, only: [:index] do
      member do
        delete :revoke
      end
      collection do
        post :invite
      end
    end
  end

  post 'notes/:id', to: 'notes#update'
  resources :tags, only: [:create]
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'notes#index'
end
