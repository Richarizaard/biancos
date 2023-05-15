import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Homepage from 'domains/Homepage'
import { MemoryRouter } from 'react-router'

const OUR_RESTAURANTS = [
  {
    name: 'Pizzeria Bianco 1',
    location: 'Heritage square (downtown)',
    address: '623 E. Adams St., Phoenix // (602 258-8300)',
    link: 'https://www.pizzeriabianco.com/pizzeria-bianco-heritage-square',
    img: 'https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/1621438781947-YSOFMKAEKIM7501K1PIL/pizzeria-bianco-phoenix-downtown.jpeg',
  },
  {
    name: 'Pizzeria Bianco 2',
    location: 'Town & Country',
    address: '4743 N 20TH St., Phoenix  // (602) 368-3273',
    link: 'https://www.pizzeriabianco.com/pizzeria-bianco-town-country',
    img: 'https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/1621015178658-Y7WCWOLAQ15HCYF4CRA4/pizzeria-bianco-town-country-sign.jpg',
  },
  {
    name: 'Pizzeria Bianco 3',
    location: 'Los Angeles',
    address: '1320 E 7th St., Los Angeles  // (213) 372-5155',
    link: 'https://www.pizzeriabianco.com/los-angeles',
    img: 'https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/a429d746-340c-408c-aa47-6b3cf848fcd3/exterior-pizzeria-bianco-los-angeles.jpeg',
  },
  {
    name: 'Pane Bianco',
    location: '',
    address: '4404 N Central Ave., Phoenix // (602) 234-2100',
    link: 'https://www.pizzeriabianco.com/pane-bianco',
    img: 'https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/1620752621903-HGEHPLKSR9JOUE95HWXS/pane-bianco.jpg',
  },
  {
    name: 'Bar Bianco',
    location: '',
    address: '623 E. Adams St., Phoenix // (602 258-8300)',
    link: 'https://www.pizzeriabianco.com/bar-bianco',
    img: 'https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/1620753441639-GW14SNWHTXER8FOOLEBM/bar-bianco-phoenix.jpg',
  },
  {
    name: 'Tratto',
    location: '',
    address: '1505 E Van Buren, Phoenix // (602) 296-7761',
    link: 'http://www.trattophx.com/',
    img: 'https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/1620753700478-8JDA4MWZG0ESCRU3RM7R/tratto-phoenix.jpg',
  },
]

// Mock window.open
global.open = jest.fn();

const renderHandler = () => {
  return render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  )
}

describe('Homepage', () => {
  it('renders the header', () => {
    // Render component
    renderHandler()

    // Look for header
    expect(screen.getByTestId('biancos-header')).toBeInTheDocument()
  })

  it('renders the restaurant cards', () => {
    // Render component
    renderHandler()

    // Look for all 6 restaurants
    const restaurantCards = screen.getAllByTestId('restaurant-card')
    expect(restaurantCards).toHaveLength(6)

    // Verify names
    const restaurantNames = OUR_RESTAURANTS.map((restaurant) => restaurant.name)
    restaurantNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('opens the restaurant link in a new tab when "Hours & Menu" button is clicked', () => {
    // Render component
    renderHandler()

    // Look for buttons
    const buttons = screen.getAllByText('Hours & Menu')

    // Go through each button and click them
    buttons.forEach((button, index) => {
      button.click()
      expect(global.open).toHaveBeenCalledWith(OUR_RESTAURANTS[index].link, '_blank');
    })
  })
})
