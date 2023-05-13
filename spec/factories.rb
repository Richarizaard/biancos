FactoryBot.define do
    factory :chef_user, class: 'User' do
      first_name { Faker::Name.first_name }
      last_name { Faker::Name.last_name }
      email { Faker::Internet.email }
      role { 'chef' }
    end
  
    factory :owner_user, class: 'User' do
        first_name { Faker::Name.first_name }
        last_name { Faker::Name.last_name }
        email { Faker::Internet.email }
        role { 'owner' }
      end

    factory :topping do
      name { Faker::Food.ingredient }
      description { Faker::Food.description }
    end
  
    factory :recipe_topping do
      recipe
      topping
    end
  
    factory :recipe do
      name { Faker::Food.dish }
      description { Faker::Food.description }
  
    #   factory :recipe_with_toppings do
    #     transient do
    #       toppings_count { 2 }
    #     end
  
    #     after(:create) do |recipe, evaluator|
    #       create_list(:recipe_topping, evaluator.toppings_count, recipe: recipe)
    #     end
    #   end
    end
  end
