module Mutations
    class CreateRecipe < BaseMutation
      field :recipe, Types::RecipeType, description: 'Newly create recipe'
  
      argument :name, String, description: 'Name of the created recipe'
      argument :description, String, description: 'Description of the created recipe'
      argument :topping_ids, [ID], description: 'IDs of the recipes ingredients'
      argument :is_chef, Boolean, required: true, description: 'Is user a chef?'

      def resolve(name:, description:, topping_ids:, is_chef:)
        raise GraphQL::ExecutionError.new("You are not a chef! You can't touch recipes!",
          extensions: { code: 'NO_PERMISSIONS'}) unless is_chef

        # Check and see if recipe with name already exists
        recipe_found = Recipe.where(name: name).count
  
        # Raise graphql error if topping already exists
        raise GraphQL::ExecutionError.new("Recipe: #{name} already exists",
            extensions: { code: 'RECIPE_EXISTS'}) if recipe_found > 0

        # Create a new recipe
        recipe = Recipe.new(name: name, description: description)

        # Create association in recipe_toppings for each topping added to the pizza
        topping_ids.each do |topping_id|
            recipe.recipe_toppings.new(topping_id: topping_id)
        end

        # Return created recipe
        recipe.save!
        { recipe: recipe }
      end
    end
  end
  