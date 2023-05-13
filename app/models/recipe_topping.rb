class RecipeTopping < ApplicationRecord
    belongs_to :recipe
    belongs_to :topping

    validates_presence_of :recipe
    validates_presence_of :topping
end
