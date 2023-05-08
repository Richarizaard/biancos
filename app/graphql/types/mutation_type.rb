module Types
  class MutationType < Types::BaseObject
    field :update_topping, mutation: Mutations::UpdateTopping, description: 'Updates topping info'
    field :delete_topping, mutation: Mutations::DeleteTopping, description: 'Deletes topping entry based off id'
  end
end
