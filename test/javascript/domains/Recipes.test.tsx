import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Recipes from 'domains/Recipes'
import { client } from 'entrypoints/main'
import { ApolloProvider } from '@apollo/client'
import { MockedProvider } from '@apollo/react-testing'
import { MemoryRouter } from 'react-router'
import { SliderContext } from 'components/SliderContext'
import { RecipesDocument, ToppingsDocument } from 'gql'
import {
  mockEmptyRecipes,
  mockEmptyToppings,
  mockRecipes,
  mockToppings,
} from './RecipesMocks'

// Mock return of recipe and topping graphql query
const getMocks = (mockRecipes: {}, mockToppings: {}) => {
  return [
    {
      request: {
        query: RecipesDocument,
      },
      result: mockRecipes,
    },
    {
      request: {
        query: ToppingsDocument,
      },
      result: mockToppings,
    },
  ]
}

const renderHandler = (mockRecipes: {}, mockToppings: {}, isChef: boolean) => {
  const mocks = getMocks(mockRecipes, mockToppings)

  return render(
    <ApolloProvider client={client}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SliderContext.Provider
            value={{ isChef: isChef, setIsChef: () => {} }}
          >
            <Recipes />
          </SliderContext.Provider>
        </MemoryRouter>
      </MockedProvider>
    </ApolloProvider>
  )
}

describe('Recipes component', () => {
  it('renders the header, intro message, and populated recipe card ', async () => {
    // Render component with valid mocks for an owner
    renderHandler(mockRecipes, mockToppings, false)

    // Wait for queries
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)))

    // Verify header, page info, and mocked recipes exist
    expect(screen.getByTestId('biancos-header')).toBeInTheDocument()
    expect(screen.getByTestId('recipe-info')).toBeInTheDocument()
    expect(
      screen.getByText(mockRecipes.data.recipes[0].name)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockRecipes.data.recipes[0].description)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockRecipes.data.recipes[0].toppings[0].name)
    ).toBeInTheDocument()
  })

  it('renders an empty recipe card if chef', async () => {
    // Render component with empty mocks for a chef
    renderHandler(mockEmptyRecipes, mockEmptyToppings, true)

    // Verify empty recipe card exists
    expect(screen.getByTestId('empty-recipe-card')).toBeInTheDocument()
  })

  it('does not render an empty recipe card if owner', async () => {
    // Render component with empty mocks for an owner
    renderHandler(mockEmptyRecipes, mockEmptyToppings, false)

    // Verify empty recipe card does not exist
    expect(screen.queryByTestId('empty-recipe-card')).not.toBeInTheDocument()
  })
})
