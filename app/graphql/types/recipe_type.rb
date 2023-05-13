# frozen_string_literal: true

module Types
  class RecipeType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: false
    field :toppings, [Types::ToppingType], null: false
    field :is_chef, Boolean, null: false, description: 'Is user a chef?'
  end
end
