module Mutations
    class DeleteTopping < BaseMutation
      field :id, ID, description: 'ID of the deleted topping'
  
      argument :id, ID, required: true, description: 'ID of the topping to be deleted'
  
      def resolve(id:)
        # Look for topping by id
        topping_found = Topping.find_by(id: id)

        # Raise graphql error if topping isn't found
        raise GraphQL::ExecutionError.new("Topping: #{name} not found",
         extensions: { code: 'TOPPING_NOT_EXISTS'}) unless topping_found

        # Remove topping
        topping_found.destroy

        # Return id to update graphql cache
        { id: id }
      end
    end
  end
  