module Mutations
  class UpdateTopping < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false
    field :topping, Types::ToppingType

    # TODO: define arguments
    # argument :name, String, required: true
    argument :id, ID, required: true
    argument :name, String
    argument :description, String

    # TODO: define resolve method
    def resolve(id:, name:, description:)
      topping_found = Topping.find_by(id: id)

      raise GraphQL::ExecutationError.new("Topping: #{name} not found",
       extensions: { code: 'NOT_FOUND'}) unless topping_found

      topping_found.update(name: name, description: description)

      { topping: topping_found }
    end
  end
end
