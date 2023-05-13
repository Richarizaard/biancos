require 'rails_helper'
require 'shoulda/matchers'

RSpec.describe Recipe, type: :model do
    let(:recipe) { FactoryBot.create(:recipe) }

    describe 'validations' do
      subject { FactoryBot.build(:recipe) }
  
      it { should validate_uniqueness_of(:name).case_insensitive }
    end
  
    describe 'associations' do
      it { should have_many(:recipe_toppings) }
      it { should have_many(:toppings).through(:recipe_toppings) }
    end

    describe 'factory' do
        it 'recipe should be valid' do
          expect(recipe).to be_valid
        end
      end
  end
  
  