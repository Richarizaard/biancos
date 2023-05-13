require 'rails_helper'

module Mutations
    RSpec.describe UpdateTopping do
        before(:each) do
            # Set up mock values
            @chef = create(:chef_user)
            @owner = create(:owner_user)

            @name_1 = Faker::Food.dish
            @name_2 = Faker::Food.dish

            @description_1 = Faker::Food.description
            @description_2 = Faker::Food.description
          
            @topping = create(:topping, name: @name_1, description: @description_1)

            @mutation = Mutations::UpdateTopping.new(
                object: nil, context: nil, field: nil
            )
        end

        it 'allows an owner to successfully update a topping' do
            response = @mutation.resolve(id: @topping.id, name: @name_2, description: @description_2, is_chef: @owner.role == 'chef')

            expect(response[:topping]).to be_persisted
            expect(response[:topping].name).to eq(@name_2)
            expect(response[:topping].description).to eq(@description_2)
        end

        it 'throws an error when the current user is not an owner' do
            expect { @mutation.resolve(id: @topping.id, name: @name_2, description: @description_2, is_chef: @chef.role == 'chef')
            }.to raise_error(GraphQL::ExecutionError, 'You are not an owner! You can\'t touch toppings!')
        end

        it 'throws an error when the topping name is updated to a topping name that already exists' do
            existing_topping = create(:topping, name: @name_2, description: @description_2)
            expect { @mutation.resolve(id: @topping.id, name: @name_2, description: @description_2, is_chef: @owner.role == 'chef') }.to raise_error(GraphQL::ExecutionError, "Topping: #{@name_2} already exists")
        end
    end
end
