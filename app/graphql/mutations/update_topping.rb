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
      # "              Failed to implement Topping.id, tried:\n\n              - `Types::ToppingType#id`, which did not exist\n              - `Topping::ActiveRecord_Relation#id`, which did not exist\n              - Looking up hash key `:id` or `\"id\"` on `#<Topping::ActiveRecord_Relation:0x00000001073c8720>`, but it wasn't a Hash\n\n              To implement this field, define one of the methods above (and check for typos), or supply a `fallback_value`.\n"
      topping_found = Topping.find(id)

      # Raise graphql error if topping already exists
      raise GraphQL::ExecutionError.new("Topping: #{name} already exists",
      extensions: { code: 'TOPPING_EXISTS'}) if Topping.find_by(name: name).present?

      topping_found.update(name: name, description: description)

      { topping: topping_found }
    end
  end
end
