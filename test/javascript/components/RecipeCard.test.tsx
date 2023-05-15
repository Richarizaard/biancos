import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import RecipeCard from 'components/RecipeCard'
import '@testing-library/jest-dom'
import { recipe } from './RecipeCardMocks'
import { SliderContext } from 'components/SliderContext'

describe('RecipeCard component', () => {
  // We don't care about what the graphql queries return.
  // Disable warns to declutter the console
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  // Notify function mock
  const notifyMock = jest.fn()

  const renderHandler = () => {
    return render(
      <MockedProvider>
        <SliderContext.Provider value={{ isChef: true, setIsChef: () => {} }}>
          <RecipeCard recipe={recipe} notify={notifyMock} />
        </SliderContext.Provider>
      </MockedProvider>
    )
  }

  it('renders recipe card', () => {
    // Render component
    renderHandler()

    // Verify recipe name, description, and toppings exist
    expect(screen.getByText(recipe.name)).toBeInTheDocument()
    expect(screen.getByText(recipe.description)).toBeInTheDocument()
    expect(screen.getByText(recipe.toppings[0].name)).toBeInTheDocument()
  })

  it('allows editing recipe', () => {
    // Render component
    renderHandler()

    // Click edit recipe button
    fireEvent.click(screen.getByTestId('recipe-edit'))

    // Verify update button exists and is not disabled
    const updateButton = screen.getByTestId('recipe-update')
    expect(updateButton).toBeInTheDocument()
    expect(updateButton).toBeDisabled()

    // Verify recipe initial name/desc are correct
    expect(screen.getByTestId('recipe-name').textContent).toBe(recipe.name)
    expect(screen.getByTestId('recipe-desc').textContent).toBe(
      recipe.description
    )

    // Edit recipe name/desc
    fireEvent.change(screen.getByTestId('recipe-name'), {
      target: { value: 'New Pizza' },
    })
    fireEvent.change(screen.getByTestId('recipe-desc'), {
      target: { value: 'Updated description' },
    })

    // Verify button is not disabled
    expect(updateButton).not.toBeDisabled()

    // Click update button
    fireEvent.click(updateButton)

    // Verify new recipe name/desc exist
    expect(screen.getByTestId('recipe-name').textContent).toBe('New Pizza')
    expect(screen.getByTestId('recipe-desc').textContent).toBe(
      'Updated description'
    )
  })

  it('allows deleting recipe', async () => {
    // Render component
    renderHandler()

    // Verify recipe name exists
    expect(screen.getByTestId('recipe-name').textContent).toBe(recipe.name)

    // Find delete button and click
    const deleteButton = screen.getByTestId('recipe-delete')
    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).not.toBeDisabled()
    fireEvent.click(deleteButton)
  })
})
