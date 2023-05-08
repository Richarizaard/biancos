module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :users, [Types::UserType], null: false, description: "Returns all users"
    field :toppings, [Types::ToppingType], null: false, description: "Returns all toppings"

    def users
      User.all.order(:last_name)
    end

    def toppings
      Topping.all.order(:name)
    end

  end
end
