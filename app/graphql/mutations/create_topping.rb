module Mutations
    class CreateTopping < BaseMutation
      # TODO: define return fields
      # field :post, Types::PostType, null: false
      field :topping, Types::ToppingType
  
      # TODO: define arguments
      # argument :name, String, required: true
      argument :name, String, required: true
      argument :description, String, required: true
  
      # TODO: define resolve method
      def resolve(name:, description:)
        topping_found = Topping.where(name: name).count
  
        # Raise graphql error if topping already exists
        raise GraphQL::ExecutionError.new("Topping: #{name} already exists",
            extensions: { code: 'TOPPING_EXISTS'}) if topping_found > 0

        topping_created = Topping.create(name: name, description: description)

        { topping: topping_created }
      end
    end
  end
  