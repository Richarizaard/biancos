require 'rails_helper'
require 'shoulda/matchers'

RSpec.describe Topping, type: :model do
    let(:topping) { FactoryBot.create(:topping) }

    describe 'validations' do
      subject { FactoryBot.build(:topping) }
  
      it { should validate_uniqueness_of(:name).case_insensitive }
    end
  
    describe 'associations' do
      it { should have_many(:recipe_toppings) }
      it { should have_many(:recipes).through(:recipe_toppings) }
    end

    describe 'factory' do
        it 'topping should be valid' do
          expect(topping).to be_valid
        end
      end
  end
  
  