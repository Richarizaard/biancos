module Mutations
  class UpdateTopping < BaseMutation
    field :topping, Types::ToppingType, description: 'Updated topping object'

    argument :id, ID, required: true, description: 'Updated topping id'
    argument :name, String, description: 'Updated topping name'
    argument :description, String, description: 'Updated topping description'
    argument :is_chef, Boolean, required: true, description: 'Is user a chef?'

    # TODO: define resolve method
    def resolve(id:, name:, description:, is_chef:)
      raise GraphQL::ExecutionError.new("You are not an owner! You can't touch toppings!",
        extensions: { code: 'NO_PERMISSIONS'}) if is_chef

      # Find topping we want to update based off ID
      topping = Topping.find(id)

      # Check if new topping name exists
      dup_topping = Topping.find_by(name: name)

      # Raise graphql error if topping name already exists
      raise GraphQL::ExecutionError.new("Topping: #{name} already exists",
      extensions: { code: 'TOPPING_EXISTS'}) if dup_topping.present? && dup_topping&.id != id.to_i

      # Otherwise, update and return topping
      topping.update(name: name, description: description)

      { topping: topping }
    end
  end
end
