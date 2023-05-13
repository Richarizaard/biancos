module Mutations
    class DeleteTopping < BaseMutation
      field :id, ID, description: 'ID of deleted topping'
  
      argument :id, ID, required: true, description: 'ID of deleted topping'
      argument :is_chef, Boolean, required: true, description: 'Is user a chef?'

      def resolve(id:, is_chef:)
        raise GraphQL::ExecutionError.new("You are not an owner! You can't touch toppings!",
          extensions: { code: 'NO_PERMISSIONS'}) if is_chef

        # Look for topping by id
        topping_found = Topping.find_by(id: id)

        # Raise graphql error if topping isn't found
        raise GraphQL::ExecutionError.new("Topping id: #{id} not found",
         extensions: { code: 'TOPPING_NOT_EXISTS'}) unless topping_found

        # Remove topping
        topping_found.destroy

        # Return id to update graphql cache
        { id: id }
      end
    end
  end
  