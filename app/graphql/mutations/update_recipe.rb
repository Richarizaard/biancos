module Mutations
    class UpdateRecipe < BaseMutation
      # TODO: define return fields
      # field :post, Types::PostType, null: false
      field :recipe, Types::RecipeType
  
      # TODO: define arguments
      # argument :name, String, required: true
      argument :id, ID, required: true
      argument :name, String, description: 'Updated recipe name'
      argument :description, String, description: 'Updated description'
      argument :topping_ids, [ID], description: 'Updated topping ids'
  
      # TODO: define resolve method
      def resolve(id:, name:, description:, topping_ids:)
        recipe = Recipe.find(id)  

        # Only update name/description if we're wanting to change those fields
        recipe.update(name: name) unless !name
        recipe.update(description: description) unless !description

        # Look and see if the recipe contains this topping
        # If so, delete it. If not, create it.
        topping_ids.each do |topping_id|
            topping_found = recipe.recipe_toppings.find_by(topping_id: topping_id)
            if topping_found.nil?
                recipe.recipe_toppings.create(topping_id: topping_id)
            else
                topping_found.destroy
            end
        end

        { recipe: recipe }
      end
    end
  end
  