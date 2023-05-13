require 'rails_helper'

module Mutations
  RSpec.describe UpdateRecipe do
    before(:each) do

        # Set up mock values
      @chef = create(:chef_user)
      @owner = create(:owner_user)

      @toppings = create_list(:topping, 3)
      @topping_ids = @toppings.map(&:id)

      @name_1 = Faker::Food.dish
      @name_2 = Faker::Food.dish
      @description = Faker::Food.description

      @recipe = create(:recipe, name: @name_1, description: @description, topping_ids: @topping_ids)

      @mutation = Mutations::UpdateRecipe.new(
        object: nil, context: nil, field: nil
      )
    end

    it 'allows a chef to successfully update a recipe' do
      response = @mutation.resolve(id: @recipe.id, name: @name_1, description: @description, topping_ids: @topping_ids, is_chef: @chef.role == 'chef')

      expect(response[:recipe]).to be_persisted
      expect(response[:recipe].name).to eq(@name_1)
      expect(response[:recipe].description).to eq(@description)
    end

    it 'allows a chef to add and remove toppings from a recipe' do
      new_toppings = create_list(:topping, 2)
      new_topping_ids = new_toppings.map(&:id)

      response = @mutation.resolve(id: @recipe.id, name: @name, description: @description, topping_ids: new_topping_ids, is_chef: @chef.role == 'chef')

      # Reload recipe
      response[:recipe].reload

      expect(response[:recipe].recipe_toppings.pluck(:topping_id)).to match_array(new_topping_ids)
    end

    it 'throws an error when the current user is not a chef' do
        expect { @mutation.resolve(id: @recipe.id, name: @name_1, description: @description, topping_ids: @topping_ids, is_chef: @owner.role == 'chef') }.to raise_error(GraphQL::ExecutionError, 'You are not a chef! You can\'t touch recipes!')
      end
  
      it 'throws an error when the recipe name is updated to a recipe name that already exists' do
        existing_recipe = create(:recipe, name: @name_2, description: @description, topping_ids: @topping_ids)
        expect { @mutation.resolve(id: @recipe.id, name: @name_2, description: @description, topping_ids: @topping_ids, is_chef: @chef.role == 'chef') }.to raise_error(GraphQL::ExecutionError, "Recipe: #{@name_2} already exists")
      end

  end
end
