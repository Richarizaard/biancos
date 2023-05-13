require 'rails_helper'

module Mutations
    RSpec.describe DeleteTopping do
        before(:each) do
            # Set up mock values
            @chef = create(:chef_user)
            @owner = create(:owner_user)

            @name_1 = Faker::Food.dish
            @description_1 = Faker::Food.description
          
            @topping = create(:topping, name: @name_1, description: @description_1)

            @mutation = Mutations::DeleteTopping.new(
                object: nil, context: nil, field: nil
            )
        end

        it 'allows an owner to successfully delete a topping' do
            response = @mutation.resolve(id: @topping.id, is_chef: @owner.role == 'chef')

            expect(response[:topping]).to be_nil
        end

        it 'throws an error when the current user is not an owner' do
            expect { @mutation.resolve(id: @topping.id, is_chef: @chef.role == 'chef')
            }.to raise_error(GraphQL::ExecutionError, 'You are not an owner! You can\'t touch toppings!')
        end

        it 'throws an error when the recipe id does not exist' do
            expect { @mutation.resolve(id: 123, is_chef: @owner.role == 'chef') }.to raise_error(GraphQL::ExecutionError, "Topping id: 123 not found")
        end
    end
end
