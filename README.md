# README

Hi there!

This pizza management app was written in Typescript <img src="https://cdn3.emoji.gg/emojis/8584-typescript.png" width="24px" height="24px" alt="TypeScript">, React <img src="https://cdn3.emoji.gg/emojis/3203-reactjs.png" width="24px" height="24px" alt="reactjs">, GraphQL, and Ruby on Rails <img src="https://cdn3.emoji.gg/emojis/5648_ruby_logo.png" width="24px" height="24px" alt="ruby_logo">.
___________________________________________________________________________________________________________________

Backend testing suite uses RSpec, FactoryBot, and Faker

These tests are located within `spec/**`

If you want to run rspec tests that test the rails models and mutations you can -

  - Run a specific test via `rspec spec/.../*_spec.rb` (rspec spec/graphql/mutations/create_recipe_spec.rb)
  - Run the whole suite of tests via `yarn rspec`
___________________________________________________________________________________________________________________
Unit testing suite uses the React testing library and Jest. 

These tests are located within `test/javascript/**`

If you want to run jest tests that test the components you can -

  - Run a specific test via `yarn jest test/.../*_test.tsx` (yarn jest test/javascript/components/ToppingCard.test.tsx)
  - Run the whole suite of tests via `yarn jest`
___________________________________________________________________________________________________________________
Run all tests with `yarn test`

___________________________________________________________________________________________________________________
**How to setup env -**

- Clone this repo
- Run `yarn install` and `bundle install`
- Open up a console and run `rails db:create` and `rails db:migrate`
- Open up two consoles and run the following two commands - 
`bin/vite dev` and `rails s`
- Navigate to `localhost:3000` and play around with the app

Live on - https://biancos.herokuapp.com/