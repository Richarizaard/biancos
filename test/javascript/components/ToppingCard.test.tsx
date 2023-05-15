import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ToppingCard from 'components/ToppingCard'
import '@testing-library/jest-dom'
import { topping } from './ToppingCardMocks'
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
        <SliderContext.Provider value={{ isChef: false, setIsChef: () => {} }}>
          <ToppingCard topping={topping} notify={notifyMock} />
        </SliderContext.Provider>
      </MockedProvider>
    )
  }

  it('renders topping card', () => {
    // Render component
    renderHandler()

    // Verify topping name/desc
    expect(screen.getByText(topping.name)).toBeInTheDocument()
    expect(screen.getByText(topping.description)).toBeInTheDocument()
  })

  it('allows editing topping', () => {
    // Render component
    renderHandler()

    // Click edit topping button
    fireEvent.click(screen.getByTestId('topping-edit'))

    // Verify update button exists and is not disabled
    const updateButton = screen.getByTestId('topping-update')
    expect(updateButton).toBeInTheDocument()
    expect(updateButton).toBeDisabled()

    // Verify topping initial name/desc are correct
    expect(screen.getByTestId('topping-name').textContent).toBe(topping.name)
    expect(screen.getByTestId('topping-desc').textContent).toBe(
      topping.description
    )

    // Edit topping name/desc
    fireEvent.change(screen.getByTestId('topping-name'), {
      target: { value: 'New Ingredient' },
    })
    fireEvent.change(screen.getByTestId('topping-desc'), {
      target: { value: 'Updated description' },
    })

    // Verify button is not disabled
    expect(updateButton).not.toBeDisabled()

    // Click update button
    fireEvent.click(updateButton)

    // Verify new topping name/desc exist
    expect(screen.getByTestId('topping-name').textContent).toBe(
      'New Ingredient'
    )
    expect(screen.getByTestId('topping-desc').textContent).toBe(
      'Updated description'
    )
  })

  it('allows deleting topping', async () => {
    // Render component
    renderHandler()

    // Verify topping name exists
    expect(screen.getByTestId('topping-name').textContent).toBe(topping.name)

    // Find delete button and click
    const deleteButton = screen.getByTestId('topping-delete')
    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).not.toBeDisabled()
    fireEvent.click(deleteButton)
  })
})
