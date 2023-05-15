import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import EmptyToppingCard from 'components/EmptyToppingCard'
import '@testing-library/jest-dom'
import { SliderContext } from 'components/SliderContext'

describe('EmptyToppingCard component', () => {
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
          <EmptyToppingCard notify={notifyMock} />
        </SliderContext.Provider>
      </MockedProvider>
    )
  }

  it('renders empty topping card', () => {
    // Render component
    renderHandler()

    // Looks for empty topping card
    const toppingCard = screen.getByTestId('empty-topping-card')
    expect(toppingCard).toBeInTheDocument()

    // Verifies buttons and topping placeholders don't exist
    expect(screen.queryByTestId('topping-create')).not.toBeInTheDocument()
    expect(screen.queryByPlaceholderText('Topping')).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText('Topping description')
    ).not.toBeInTheDocument()

    // Verifies plus exists
    expect(screen.getByTestId('add-topping')).toBeInTheDocument()
  })

  it('allows creating a topping', () => {
    // Render component
    renderHandler()

    // Click empty card to add topping
    fireEvent.click(screen.getByTestId('add-topping'))

    // Verifies create button exists and is disabled
    const createButton = screen.getByTestId('empty-topping-card-create-button')
    expect(createButton).toBeInTheDocument()
    expect(createButton).toBeDisabled()

    // Looks for topping placeholder and changes topping name
    expect(screen.getByPlaceholderText('Topping')).toBeInTheDocument()
    fireEvent.change(screen.getByTestId('empty-topping-card-name'), {
      target: { value: 'New Topping' },
    })

    // Looks for topping placeholder and changes topping description
    expect(screen.getByPlaceholderText('Topping description')).toBeInTheDocument
    fireEvent.change(screen.getByTestId('empty-topping-card-desc'), {
      target: { value: 'New Topping Description' },
    })

    // Verifies create button is no longer disabled
    expect(createButton).not.toBeDisabled()

    // Clicks create button
    fireEvent.click(createButton)

    // Verifies new topping name/description exist
    expect(screen.getByTestId('empty-topping-card-name').textContent).toBe(
      'New Topping'
    )
    expect(screen.getByTestId('empty-topping-card-desc').textContent).toBe(
      'New Topping Description'
    )
  })

  it('disables create button when fields are not filled out', () => {
    // Render component
    renderHandler()

    // Looks for plus
    fireEvent.click(screen.getByTestId('add-topping'))

    // Looks and verifies create button exists and is disabled
    const createButton = screen.getByTestId('empty-topping-card-create-button')
    expect(createButton).toBeInTheDocument()
    expect(createButton).toBeDisabled()

    // Change topping name
    fireEvent.change(screen.getByPlaceholderText('Topping'), {
      target: { value: 'New Topping' },
    })

    // Verifies button is still disabled
    expect(createButton).toBeDisabled()

    // Change topping description
    fireEvent.change(screen.getByPlaceholderText('Topping description'), {
      target: { value: 'New Topping Description' },
    })

    // Verifies button is no longer disabled
    expect(createButton).not.toBeDisabled()
  })

  it('resets states when cancel button is clicked', () => {
    // Render Component
    renderHandler()

    // Click to add a topping
    fireEvent.click(screen.getByTestId('add-topping'))

    // Fill out info for new topping
    fireEvent.change(screen.getByPlaceholderText('Topping'), {
      target: { value: 'New Topping' },
    })
    fireEvent.change(screen.getByPlaceholderText('Topping description'), {
      target: { value: 'New Topping Description' },
    })

    // Verifies new topping name/description have changed
    expect(screen.getByTestId('empty-topping-card-name').textContent).toBe(
      'New Topping'
    )
    expect(screen.getByTestId('empty-topping-card-desc').textContent).toBe(
      'New Topping Description'
    )

    // Cancel topping
    fireEvent.click(screen.getByTestId('empty-topping-card-cancel-button'))

    // Verifies placeholders/buttons don't exist
    expect(screen.queryByPlaceholderText('Topping')).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText('Topping description')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('empty-topping-card-create-button')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('empty-topping-card-cancel-button')
    ).not.toBeInTheDocument()

    // Verify plus exists
    expect(screen.getByTestId('add-topping')).toBeInTheDocument()
  })
})
