import { Recipe } from 'gql'

export const recipe: Recipe = {
  __typename: 'Recipe',
  id: '1',
  name: 'Pizza',
  description: 'Delicious pizza recipe',
  toppings: [
    {
      __typename: 'Topping',
      id: '1',
      name: 'Cheese',
      description: 'Tasty cheese',
    },
  ],
}
