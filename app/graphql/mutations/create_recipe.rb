module Mutations
    class CreateRecipe < BaseMutation
      field :recipe, Types::RecipeType, description: 'Created recipe'
  
      argument :name, String, description: 'Name of the created recipe'
      argument :description, String, description: 'Description of the created recipe'
      argument :topping_ids, [ID], description: 'IDs of the recipes ingredients'

      def resolve(name:, description:, topping_ids:)
        # Create recipe
        const recipe = Recipe.create(name: name, description: description)

        topping_ids.each do |topping_id|
            recipe.recipe_toppings.create(topping_id: topping_id)
        end

        # Return created recipe
        { recipe: recipe }
      end
    end
  end
  