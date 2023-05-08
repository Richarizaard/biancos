import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
          <button className="rounded-lg bg-bianco-pink text-white p-2 px-4">
            Log in
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
