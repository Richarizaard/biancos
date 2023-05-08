class Recipe < ApplicationRecord
    has_many :recipe_toppings
    has_many :toppings, through: :recipe_toppings

    validates :name, uniqueness: { case_sensitive: false }
end
