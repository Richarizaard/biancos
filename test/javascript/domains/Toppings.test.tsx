import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Toppings from 'domains/Toppings'
import { client } from 'entrypoints/main'
import { ApolloProvider } from '@apollo/client'
import { MockedProvider } from '@apollo/react-testing'
import { MemoryRouter } from 'react-router'
import { SliderContext } from 'components/SliderContext'
import { ToppingsDocument } from 'gql'
import { mockEmptyToppings, mockToppings } from './ToppingsMocks'

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

const renderHandler = (mockToppings: {}, isChef: boolean) => {
  const mocks = getMocks(mockToppings)

  return render(
    <ApolloProvider client={client}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SliderContext.Provider
            value={{ isChef: isChef, setIsChef: () => {} }}
          >
            <Toppings />
          </SliderContext.Provider>
        </MemoryRouter>
      </MockedProvider>
    </ApolloProvider>
  )
}

describe('Toppings component', () => {
  it('renders the header, intro message, and populated topping card ', async () => {
    // Render component with valid mock for a chef
    renderHandler(mockToppings, true)

    // Wait for queries
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)))

    // Verify header, page info, and mocked toppings exist
    expect(screen.getByTestId('biancos-header')).toBeInTheDocument()
    expect(screen.getByTestId('topping-info')).toBeInTheDocument()
    expect(
      screen.getByText(mockToppings.data.toppings[0].name)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockToppings.data.toppings[0].description)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockToppings.data.toppings[1].description)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockToppings.data.toppings[1].description)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockToppings.data.toppings[2].description)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockToppings.data.toppings[2].description)
    ).toBeInTheDocument()
  })

  it('renders an empty topping card if owner', async () => {
    // Render component with empty mocks for an owner
    renderHandler(mockEmptyToppings, false)

    // Verify empty topping card exists
    expect(screen.getByTestId('empty-topping-card')).toBeInTheDocument()
  })

  it('does not render an empty topping card if chef', async () => {
    // Render component with empty mocks for a chef
    renderHandler(mockEmptyToppings, true)

    // Verify empty topping card does not exist
    expect(screen.queryByTestId('empty-topping-card')).not.toBeInTheDocument()
  })
})
