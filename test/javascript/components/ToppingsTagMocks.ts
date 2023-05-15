import { Topping } from 'gql'

export const mockToppings = {
  data: {
    toppings: [
      { id: '1', name: 'Mozzarella', description: 'Melting cheese' },
      { id: '2', name: 'Tomato', description: 'Fresh tomatoes' },
      { id: '3', name: 'Basil', description: 'Fresh basil leaves' },
    ],
  },
}

export const mockEmptyToppings = {
  data: {
    toppings: [],
  },
}

export const toppings: Topping[] = [
  {
    __typename: 'Topping',
    id: '1',
    name: 'Mozzarella',
    description: 'Melting cheese',
  },
  {
    __typename: 'Topping',
    id: '2',
    name: 'Tomato',
    description: 'Fresh tomatoes',
  },
]
