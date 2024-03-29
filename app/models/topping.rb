class Topping < ApplicationRecord
    has_many :recipe_toppings
    has_many :recipes, through: :recipe_toppings

    validates :name, uniqueness: { case_sensitive: false }
end
