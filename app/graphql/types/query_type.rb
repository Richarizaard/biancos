module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :users, [Types::UserType], null: false, description: "Returns all users"
    field :toppings, [Types::ToppingType], null: false, description: "Returns all toppings"
    field :recipes, [Types::RecipeType], null: false, description: "Returns all recipes"


    def users
      User.all.order(:last_name)
    end

    def toppings
      Topping.all.order(:name)
    end

    def recipes
      Recipe.all.order(:name)
    end

  end
end
