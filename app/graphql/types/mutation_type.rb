module Types
  class MutationType < Types::BaseObject
    field :create_recipe, mutation: Mutations::CreateRecipe, description: 'Creates a recipe'
    field :update_recipe, mutation: Mutations::UpdateRecipe, description: 'Updates a recipe'
    field :delete_recipe, mutation: Mutations::DeleteRecipe, description: 'Deletes a recipe'


    field :create_topping, mutation: Mutations::CreateTopping, description: 'Creates a topping'
    field :update_topping, mutation: Mutations::UpdateTopping, description: 'Updates a topping'
    field :delete_topping, mutation: Mutations::DeleteTopping, description: 'Deletes a topping'
  end
end
