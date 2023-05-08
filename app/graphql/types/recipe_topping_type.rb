# frozen_string_literal: true

module Types
  class RecipeToppingType < Types::BaseObject
    field :id, ID, null: false
    field :topping_id, Integer
    field :recipe_id, Integer
  end
end
