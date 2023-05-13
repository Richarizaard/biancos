module Mutations
    class CreateTopping < BaseMutation
      field :topping, Types::ToppingType, description: 'Newly created topping'
  
      argument :name, String, required: true, description: 'Name of deleted topping'
      argument :description, String, required: true, description: 'Description of deleted topping'
  
      # TODO: define resolve method
      def resolve(name:, description:)
        # Check and see if topping with name already exists
        topping_found = Topping.where(name: name).count
  
        # Raise graphql error if topping already exists
        raise GraphQL::ExecutionError.new("Topping: #{name} already exists",
            extensions: { code: 'TOPPING_EXISTS'}) if topping_found > 0

        # Otherwise, create and return topping
        topping_created = Topping.create(name: name, description: description)

        { topping: topping_created }
      end
    end
  end
  