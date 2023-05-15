export const mockRecipes = {
  data: {
    recipes: [
      {
        id: 1,
        name: 'Pizza Margherita',
        description: 'Classic pizza with tomato, mozzarella, and basil',
        toppings: [
          { id: 1, name: 'Tomato', description: 'Fresh tomatoes' },
          { id: 2, name: 'Mozzarella', description: 'Melting cheese' },
          { id: 3, name: 'Basil', description: 'Fresh basil leaves' },
        ],
      },
    ],
  },
}

export const mockToppings = {
  data: {
    toppings: [
      { id: 1, name: 'Tomato', description: 'Fresh tomatoes' },
      { id: 2, name: 'Mozzarella', description: 'Melting cheese' },
      { id: 3, name: 'Basil', description: 'Fresh basil leaves' },
    ],
  },
}

export const mockEmptyRecipes = {
  data: {
    recipes: [],
  },
}

export const mockEmptyToppings = {
  data: {
    toppings: [],
  },
}
