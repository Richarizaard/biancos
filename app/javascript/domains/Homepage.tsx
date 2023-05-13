import Header from 'components/Header'
import { SliderContext } from 'components/SliderContext'
import React, { useContext } from 'react'
import BiancoHeader1 from 'utils/typography/BiancoHeader1'
import BiancoHeader2 from 'utils/typography/BiancoHeader2'

const OUR_RESTAURANTS = [
  {
    name: 'Pizzeria Bianco',
    location: 'Heritage square (downtown)',
    address: '623 E. Adams St., Phoenix // (602 258-8300)',
    link: 'https://www.pizzeriabianco.com/pizzeria-bianco-heritage-square',
    img: 'https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/1621438781947-YSOFMKAEKIM7501K1PIL/pizzeria-bianco-phoenix-downtown.jpeg',
  },
  {
    name: 'Pizzeria Bianco',
    location: 'Town & Country',
    address: '4743 N 20TH St., Phoenix  // (602) 368-3273',
    link: 'https://www.pizzeriabianco.com/pizzeria-bianco-town-country',
    img: 'https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/1621015178658-Y7WCWOLAQ15HCYF4CRA4/pizzeria-bianco-town-country-sign.jpg',
  },
  {
    name: 'Pizzeria Bianco',
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
const Homepage = () => {
  const { isChef } = useContext(SliderContext)
  return (
    <div className="container mx-auto px-6 sm:px-24">
      <Header />
      <img src="https://images.squarespace-cdn.com/content/v1/6099bdee28fc4e72bd84675b/1620696079215-3MMBPC9C1PNRFPXNDH0A/pizzeria-bianco.jpg" />
      <div className="my-2 py-4 text-5xl font-bold flex justify-center">
        OUR RESTAURANTS
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,auto))]">
        {OUR_RESTAURANTS.map((restaurant, idx) => {
          return (
            <div
              key={idx}
              className="w-full p-4 m-4 flex justify-center items-center flex-col"
            >
              <img src={restaurant.img} />
              <BiancoHeader1>{restaurant.name}</BiancoHeader1>
              <BiancoHeader2>{restaurant.location}</BiancoHeader2>
              <div>{restaurant.address}</div>
              <button
                className="m-2 p-2 border-2 bg-bianco-pink rounded-lg hover:shadow-lg"
                onClick={() => window.open(restaurant.link, '_blank')}
              >
                Hours & Menu
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Homepage
