module Mutations
    class UpdateRecipe < BaseMutation
      field :recipe, Types::RecipeType, description: 'Updated recipe object'
  
      argument :id, ID, required: true
      argument :name, String, description: 'Updated recipe name'
      argument :description, String, description: 'Updated description'
      argument :topping_ids, [ID], description: 'Updated topping ids'
      argument :is_chef, Boolean, description: 'Is user a chef?'
  
      def resolve(id:, name:, description:, topping_ids:, is_chef:)
        raise GraphQL::ExecutionError.new("You are not a chef! You can't touch recipes!",
          extensions: { code: 'NO_PERMISSIONS'}) unless is_chef

        recipe = Recipe.find(id)  

        # Check if new recipe name exists
        dup_recipe = Recipe.find_by(name: name)

        # Raise graphql error if recipe name already exists
        raise GraphQL::ExecutionError.new("Recipe: #{name} already exists",
        extensions: { code: 'RECIPE_EXISTS'}) if dup_recipe.present? && dup_recipe&.id != id.to_i

        # Only update name/description if we're wanting to change those fields
        recipe.update(name: name) if name.present?
        recipe.update(description: description) if description.present?

        # Get a list of the IDs of the toppings in recipe_toppings
        recipe_toppings_ids = recipe.recipe_toppings.pluck(:id)

        # Remove any toppings in recipe_toppings that aren't in topping_ids
        recipe.recipe_toppings.each do |topping|
          next if topping_ids.include?(topping.id)
          topping.destroy
        end

        # Add any toppings to recipe_toppings that aren't in topping_ids
        topping_ids.each do |topping_id|
          next if recipe_toppings_ids.include?(topping_id)
          recipe.recipe_toppings.create(topping_id: topping_id)
        end

        { recipe: recipe }
      end
    end
  end
  