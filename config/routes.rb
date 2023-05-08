Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  root to: 'spa#root'
  get '/toppings', to: 'spa#root'
  get '/recipes', to: 'spa#root'
  get '/about-us', to: 'spa#root'

  draw :madmin
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
