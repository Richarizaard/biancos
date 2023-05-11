module Mutations
  class UpdateTopping < BaseMutation
    field :topping, Types::ToppingType

    argument :id, ID, required: true
    argument :name, String
    argument :description, String

    # TODO: define resolve method
    def resolve(id:, name:, description:)
      topping = Topping.find(id)
      dup_topping = Topping.find_by(name: name)

      # Raise graphql error if topping already exists
      raise GraphQL::ExecutionError.new("Topping: #{name} already exists",
      extensions: { code: 'TOPPING_EXISTS'}) if dup_topping.id != id.to_i

      topping.update(name: name, description: description)

      { topping: topping }
    end
  end
end
