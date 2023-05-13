require 'rails_helper'

module Mutations
    RSpec.describe CreateRecipe do
        before(:each) do
            # Set up mock values
            @chef = create(:chef_user)
            @owner = create(:owner_user)

            @toppings = create_list(:topping, 3)
            @topping_ids = @toppings.map(&:id)

            @name = Faker::Food.dish
            @description = Faker::Food.description
          
            @mutation = Mutations::CreateRecipe.new(
                object: nil, context: nil, field: nil
            )
        end

        it 'allows a chef to successfully create a recipe' do
            response = @mutation.resolve(name: @name, description: @description, topping_ids: @topping_ids, is_chef: @chef.role == 'chef')

            expect(response[:recipe]).to be_persisted
            expect(response[:recipe].name).to eq(@name)
            expect(response[:recipe].description).to eq(@description)
            expect(response[:recipe].topping_ids).to eq(@topping_ids)
        end

        it 'throws an error when the current user is not a chef' do
            expect { @mutation.resolve(name: @name, description: @description, topping_ids: @topping_ids, is_chef: @owner.role == 'chef') }.to raise_error(GraphQL::ExecutionError, 'You are not a chef! You can\'t touch recipes!')
        end

        it 'throws an error when the recipe name already exists' do
            @mutation.resolve(name: @name, description: @description, topping_ids: @topping_ids, is_chef: @chef.role == 'chef')
            expect { @mutation.resolve(name: @name, description: @description, topping_ids: @topping_ids, is_chef: @chef.role == 'chef') }.to raise_error(GraphQL::ExecutionError, "Recipe: #{@name} already exists")
        end
    end
end
