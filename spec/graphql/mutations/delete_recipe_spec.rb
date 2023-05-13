require 'rails_helper'

module Mutations
  RSpec.describe DeleteRecipe do
    before(:each) do

        # Set up mock values
      @chef = create(:chef_user)
      @owner = create(:owner_user)

      @toppings = create_list(:topping, 3)
      @topping_ids = @toppings.map(&:id)

      @name_1 = Faker::Food.dish
      @description = Faker::Food.description

      @recipe = create(:recipe, name: @name_1, description: @description, topping_ids: @topping_ids)

      @mutation = Mutations::DeleteRecipe.new(
        object: nil, context: nil, field: nil
      )
    end

    it 'allows a chef to successfully delete a recipe' do
      response = @mutation.resolve(id: @recipe.id, is_chef: @chef.role == 'chef')
    
      expect(response[:recipe]).to be_nil
    end

    it 'throws an error when the current user is not a chef' do
        expect { @mutation.resolve(id: @recipe.id, is_chef: @owner.role == 'chef') }.to raise_error(GraphQL::ExecutionError, 'You are not a chef! You can\'t touch recipes!')
      end
  
      it 'throws an error when the recipe id does not exist' do
        expect { @mutation.resolve(id: 123, is_chef: @chef.role == 'chef') }.to raise_error(GraphQL::ExecutionError, "Recipe id: 123 not found")
      end

  end
end
