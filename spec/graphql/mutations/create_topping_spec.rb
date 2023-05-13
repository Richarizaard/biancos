require 'rails_helper'

module Mutations
    RSpec.describe CreateTopping do
        before(:each) do
            # Set up mock values
            @chef = create(:chef_user)
            @owner = create(:owner_user)

            @name = Faker::Food.dish
            @description = Faker::Food.description
          
            @mutation = Mutations::CreateTopping.new(
                object: nil, context: nil, field: nil
            )
        end

        it 'allows an owner to successfully create a topping' do
            response = @mutation.resolve(name: @name, description: @description, is_chef: @owner.role == 'chef')

            expect(response[:topping]).to be_persisted
            expect(response[:topping].name).to eq(@name)
            expect(response[:topping].description).to eq(@description)
        end

        it 'throws an error when the current user is not an owner' do
            expect { @mutation.resolve(name: @name, description: @description, is_chef: @chef.role == 'chef')
            }.to raise_error(GraphQL::ExecutionError, 'You are not an owner! You can\'t touch toppings!')
        end

        it 'throws an error when the topping name already exists' do
            @mutation.resolve(name: @name, description: @description, is_chef: @owner.role == 'chef')
            expect { @mutation.resolve(name: @name, description: @description, is_chef: @owner.role == 'chef') }.to raise_error(GraphQL::ExecutionError, "Topping: #{@name} already exists")
        end
    end
end
