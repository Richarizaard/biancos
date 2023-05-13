module Mutations
    class DeleteRecipe < BaseMutation
      field :id, ID, description: 'ID of deleted recipe'
  
      argument :id, ID, required: true, description: 'ID of deleted recipe'
      argument :is_chef, Boolean, required: true, description: 'Is user a chef?'

      def resolve(id:, is_chef:)
        raise GraphQL::ExecutionError.new("You are not a chef! You can't touch recipes!",
          extensions: { code: 'NO_PERMISSIONS'}) unless is_chef

        # Look for recipe by id
        recipe = Recipe.find_by(id: id)

        # Raise graphql error if recipe isn't found
        raise GraphQL::ExecutionError.new("Recipe id: #{id} not found",
         extensions: { code: 'RECIPE_NOT_EXISTS'}) unless recipe

        # Remove recipe
        recipe.destroy

        # Return id to update graphql cache
        { id: id }
      end
    end
  end
  