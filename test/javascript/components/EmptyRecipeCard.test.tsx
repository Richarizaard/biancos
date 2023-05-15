import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import EmptyRecipeCard from 'components/EmptyRecipeCard'
import '@testing-library/jest-dom'
import { SliderContext } from 'components/SliderContext'
import { ToppingsDocument } from 'gql'
import { mockEmptyToppings, mockToppings } from './EmptyRecipeCardMocks'

// Mock return of topping graphql query
const getMocks = (mockToppings: {}) => {
  return [
    {
      request: {
        query: ToppingsDocument,
      },
      result: mockToppings,
    },
  ]
}

describe('EmptyRecipeCard component', () => {
  // We don't care about what the graphql queries return.
  // Disable warns to declutter the console
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  // Notify function mock
  const notifyMock = jest.fn()

  const renderHandler = (mockToppings: {}) => {
    const mocks = getMocks(mockToppings)

    return render(
      <MockedProvider mocks={mocks}>
        <SliderContext.Provider value={{ isChef: true, setIsChef: () => {} }}>
          <EmptyRecipeCard notify={notifyMock} />
        </SliderContext.Provider>
      </MockedProvider>
    )
  }

  it('renders empty recipe card', () => {
    // Render component
    renderHandler(mockEmptyToppings)

    // Looks for empty recipe card
    const recipeCard = screen.getByTestId('empty-recipe-card')
    expect(recipeCard).toBeInTheDocument()

    // Verifies buttons and recipe placeholders don't exist
    expect(screen.queryByTestId('recipe-create')).not.toBeInTheDocument()
    expect(screen.queryByPlaceholderText('Recipe')).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText('Recipe description')
    ).not.toBeInTheDocument()

    // Verifies plus exists
    expect(screen.getByTestId('add-recipe')).toBeInTheDocument()
  })

  it('allows creating a recipe', () => {
    // Render component
    renderHandler(mockToppings)

    // Click empty card to add recipe
    fireEvent.click(screen.getByTestId('add-recipe'))

    // Verifies create button exists and is disabled
    const createButton = screen.getByTestId('empty-recipe-card-create-button')
    expect(createButton).toBeInTheDocument()
    expect(createButton).toBeDisabled()

    // Looks for recipe placeholder and changes recipe name
    expect(screen.getByPlaceholderText('Recipe')).toBeInTheDocument()
    fireEvent.change(screen.getByTestId('empty-recipe-card-name'), {
      target: { value: 'New Recipe' },
    })

    // Looks for recipe placeholder and changes recipe description
    expect(screen.getByPlaceholderText('Recipe description')).toBeInTheDocument
    fireEvent.change(screen.getByTestId('empty-recipe-card-desc'), {
      target: { value: 'New Recipe Description' },
    })

    // Verifies create button is no longer disabled
    expect(createButton).not.toBeDisabled()

    // Clicks create button
    fireEvent.click(createButton)

    // Verifies new recipe name/description exist
    expect(screen.getByTestId('empty-recipe-card-name').textContent).toBe(
      'New Recipe'
    )
    expect(screen.getByTestId('empty-recipe-card-desc').textContent).toBe(
      'New Recipe Description'
    )
  })

  it('disables create button when fields are not filled out', () => {
    // Render component
    renderHandler(mockEmptyToppings)

    // Looks for plus
    fireEvent.click(screen.getByTestId('add-recipe'))

    // Looks and verifies create button exists and is disabled
    const createButton = screen.getByTestId('empty-recipe-card-create-button')
    expect(createButton).toBeInTheDocument()
    expect(createButton).toBeDisabled()

    // Change recipe name
    fireEvent.change(screen.getByPlaceholderText('Recipe'), {
      target: { value: 'New Recipe' },
    })

    // Verifies button is still disabled
    expect(createButton).toBeDisabled()

    // Change recipe description
    fireEvent.change(screen.getByPlaceholderText('Recipe description'), {
      target: { value: 'New Recipe Description' },
    })

    // Verifies button is no longer disabled
    expect(createButton).not.toBeDisabled()
  })

  it('resets states when cancel button is clicked', () => {
    // Render Component
    renderHandler(mockEmptyToppings)

    // Click to add a recipe
    fireEvent.click(screen.getByTestId('add-recipe'))

    // Fill out info for new recipe
    fireEvent.change(screen.getByPlaceholderText('Recipe'), {
      target: { value: 'New Recipe' },
    })
    fireEvent.change(screen.getByPlaceholderText('Recipe description'), {
      target: { value: 'New Recipe Description' },
    })

    // Verifies new recipe name/description have changed
    expect(screen.getByTestId('empty-recipe-card-name').textContent).toBe(
      'New Recipe'
    )
    expect(screen.getByTestId('empty-recipe-card-desc').textContent).toBe(
      'New Recipe Description'
    )

    // Cancel recipe
    fireEvent.click(screen.getByTestId('empty-recipe-card-cancel-button'))

    // Verifies placeholders/buttons don't exist
    expect(screen.queryByPlaceholderText('Recipe')).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText('Recipe description')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('empty-recipe-card-create-button')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('empty-recipe-card-cancel-button')
    ).not.toBeInTheDocument()

    // Verify plus exists
    expect(screen.getByTestId('add-recipe')).toBeInTheDocument()
  })
})
