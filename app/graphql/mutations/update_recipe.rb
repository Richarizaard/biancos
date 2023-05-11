module Mutations
    class UpdateRecipe < BaseMutation
      field :recipe, Types::RecipeType
  
      argument :id, ID, required: true
      argument :name, String, description: 'Updated recipe name'
      argument :description, String, description: 'Updated description'
      argument :topping_ids, [ID], description: 'Updated topping ids'
  
      def resolve(id:, name:, description:, topping_ids:)
        recipe = Recipe.find(id)  

        # Only update name/description if we're wanting to change those fields
        recipe.update(name: name) unless !name
        recipe.update(description: description) unless !description

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
  