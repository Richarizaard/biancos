require 'rails_helper'
require 'shoulda/matchers'

RSpec.describe RecipeTopping, type: :model do
    let(:recipe) { FactoryBot.create(:recipe) }
    let(:topping) { FactoryBot.create(:topping) }
    let(:recipe_topping) { FactoryBot.create(:recipe_topping, recipe: recipe, topping: topping) }

    describe 'validations' do
      it { should validate_presence_of(:recipe) }
      it { should validate_presence_of(:topping) }
    end
  
    describe 'associations' do
      it { should belong_to(:recipe) }
      it { should belong_to(:topping) }
    end

    describe 'factory' do
      it 'recipe_topping should be valid' do
        expect(recipe_topping).to be_valid
      end
    end
  end