module Mutations
    class DeleteRecipe < BaseMutation
      field :id, ID, description: 'ID of deleted recipe'
  
      argument :id, ID, required: true, description: 'ID of deleted recipe'
  
      def resolve(id:)
        # Look for topping by id
        recipe = Recipe.find(id)

        # Raise graphql error if topping isn't found
        raise GraphQL::ExecutionError.new("Recipe id: #{id} not found",
         extensions: { code: 'EXCIPE_NOT_EXISTS'}) unless recipe

        # Remove recipe
        recipe.destroy

        # Return id to update graphql cache
        { id: id }
      end
    end
  end
  