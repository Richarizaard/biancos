module Types
  class MutationType < Types::BaseObject
    field :create_recipe, mutation: Mutations::CreateRecipe, description: 'Creates a recipe'
    field :update_topping, mutation: Mutations::UpdateTopping, description: 'Updates topping info'
    field :delete_topping, mutation: Mutations::DeleteTopping, description: 'Deletes topping entry based off id'
  end
end
