class RecipeTopping < ApplicationRecord
    belongs_to :recipe
    belongs_to :topping

# validate here
end
