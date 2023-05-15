import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ToppingsTag from 'components/ToppingsTag'
import { Topping, ToppingsDocument, useToppingsQuery } from 'gql'
import { mockEmptyToppings, mockToppings, toppings } from './ToppingsTagMocks'
import { ApolloProvider } from '@apollo/client'
import { client } from 'entrypoints/main'

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

describe('ToppingsTag component', () => {
  const setToppingsMock = jest.fn()

  const renderHandler = (
    mockToppings: {},
    toppings: Topping[],
    isEditOrCreate: boolean
  ) => {
    const mocks = getMocks(mockToppings)

    return render(
      <ApolloProvider client={client}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ToppingsTag
            toppings={toppings}
            setToppings={setToppingsMock}
            isEditOrCreate={isEditOrCreate}
          />
        </MockedProvider>
      </ApolloProvider>
    )
  }

  it('renders toppings tags', () => {
    // Render component
    renderHandler(mockToppings, toppings, true)

    // Verify 2 delete tags
    const tags = screen.getAllByTestId('delete-topping-tag')
    expect(tags.length).toBe(2)

    // Verify topping names
    expect(screen.getByText('Tomato')).toBeInTheDocument()
    expect(screen.getByText('Mozzarella')).toBeInTheDocument()
  })

  it('adds a topping tag', async () => {
    // Render component
    renderHandler(mockToppings, [], true)

    // Wait for queries
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)))

    // Verify toppings not found
    expect(screen.queryByText('Mozzarella')).not.toBeInTheDocument()

    // Click add topping tag
    fireEvent.click(screen.getByTestId('add-topping-tag'))

    // Verify topping and click to add
    const topping1 = screen.getByText('Mozzarella')
    expect(topping1).toBeInTheDocument()
    fireEvent.click(topping1)

    // Verify toppings state called
    expect(setToppingsMock).toHaveBeenCalledWith([
      { id: '1', name: 'Mozzarella', description: 'Melting cheese' },
    ])
  })

  it('removes a topping tag', () => {
    // Render component
    renderHandler(mockToppings, toppings, true)

    // Verify topping tags found
    const tag1 = screen.getByText('Mozzarella')
    const tag2 = screen.getByText('Tomato')

    expect(tag2).toBeInTheDocument()
    expect(tag1).toBeInTheDocument()

    // Delete toppings and verify topping state called
    fireEvent.click(screen.getAllByTestId('delete-topping-tag')[0])
    expect(setToppingsMock).toHaveBeenCalledWith([toppings[1]])

    fireEvent.click(screen.getAllByTestId('delete-topping-tag')[1])
    expect(setToppingsMock).toHaveBeenCalledWith([toppings[0]])
  })

  it('opens and closes the topping dropdown', async () => {
    // Render component
    renderHandler(mockToppings, [], true)

    // Wait for queries
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)))

    // Verify clicking opens dropdown
    fireEvent.click(screen.getByTestId('add-topping-tag'))
    expect(screen.getByTestId('topping-dropdown')).toBeInTheDocument()

    // Verify clicking again closes dropdown
    fireEvent.click(screen.getByTestId('add-topping-tag'))
    expect(screen.queryByTestId('topping-dropdown')).not.toBeInTheDocument()
  })

  it('does not render topping dropdown nor allows to remove topping when not in edit/create mode', () => {
    // Render component
    renderHandler(mockEmptyToppings, toppings, false)

    // Verify no delete/add tags and no dropdown when no in edit/create mode
    const deleteButtons = screen.queryAllByTestId('delete-topping-tag')
    expect(deleteButtons).toHaveLength(0)
    expect(screen.queryByTestId('add-topping-tag')).not.toBeInTheDocument()
    expect(screen.queryByTestId('topping-dropdown')).not.toBeInTheDocument()
  })
})
