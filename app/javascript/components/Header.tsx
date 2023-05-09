import SliderButton from 'components/SliderButton'
import { SliderContext } from 'components/SliderContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const { isChef } = useContext(SliderContext)

  return (
    <nav className="">
      <div className="flex w-full justify-between items-center text-lg font-medium">
        <div>
          <Link to={'/'} className="text-bianco-red text-4xl font-bold">
            Biancos
          </Link>
        </div>
        <div className="hidden lg:flex gap-8 items-center text-bianco-red">
          <Link
            to={'/toppings'}
            className="hover:bg-bianco-pink py-1 px-3 rounded-lg"
          >
            Toppings
          </Link>
          <Link
            to={'/recipes'}
            className="hover:bg-bianco-pink  py-1 px-3 rounded-lg"
          >
            Recipes
          </Link>
          <Link
            to={'/about-us'}
            className="hover:bg-bianco-pink py-1 px-3 rounded-lg"
          >
            About us
          </Link>
          <div className="flex items-center text-sm">
            <span
              className={`${isChef ? 'text-bianco-pink' : 'text-bianco-red'}`}
            >
              Owner
            </span>
            <SliderButton />
            <span
              className={`${isChef ? 'text-bianco-red' : 'text-bianco-pink'}`}
            >
              Chef
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
