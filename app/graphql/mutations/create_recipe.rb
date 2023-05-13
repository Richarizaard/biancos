module Mutations
    class CreateRecipe < BaseMutation
      field :recipe, Types::RecipeType, description: 'Newly create recipe'
  
      argument :name, String, description: 'Name of the created recipe'
      argument :description, String, description: 'Description of the created recipe'
      argument :topping_ids, [ID], description: 'IDs of the recipes ingredients'

      def resolve(name:, description:, topping_ids:)
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
  