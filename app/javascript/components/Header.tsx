import SliderButton from 'components/SliderButton'
import { SliderContext } from 'components/SliderContext'
import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [menu, setMenu] = useState<boolean>(false)
  const currentRoute = useLocation()

  const { isChef } = useContext(SliderContext)

  // Add CSS properties to disallow scrolling when mobile nav is open
  const openMenu = () => {
    document.body.style.overflowY = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    setMenu(true)
  }

  const closeMenu = () => {
    document.body.style.overflowY = 'visible'
    document.body.style.position = 'static'
    document.body.style.width = 'auto'
    setMenu(false)
  }

  return (
    <>
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
        </div>
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
        <div className="lg:hidden flex justify-end">
          <button onClick={openMenu}>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 2.39999V0.399994H0V2.39999H20ZM20 7.99999V9.99999H0V7.99999H20ZM20 15.6V17.6H0V15.6H20Z"
                fill="#f40000ff"
              />
            </svg>
          </button>
          {menu && (
            <div className="fixed z-10 left-0 top-0 backdrop-blur-lg bg-gray-300/60 h-full w-full">
              <div className="flex flex-col h-full w-full justify-start items-center space-y-1 pb-3 pt-2 mt-8">
                <div className="flex justify-end w-full pr-6 mr-2">
                  <button onClick={closeMenu}>
                    <svg
                      fill="#f40000ff"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" />
                    </svg>
                  </button>
                </div>
                {currentRoute.pathname !== '/' && (
                  <Link
                    to={'/'}
                    onClick={closeMenu}
                    className="hover:text-bianco-red block rounded-md px-3 py-4 font-semibold text-lg"
                  >
                    Home
                  </Link>
                )}
                <Link
                  to={'/toppings'}
                  onClick={closeMenu}
                  className="hover:text-bianco-red block rounded-md px-3 py-4 font-semibold text-lg"
                >
                  Toppings
                </Link>

                <Link
                  to="/recipes"
                  onClick={closeMenu}
                  className="hover:text-bianco-red block rounded-md px-3 py-4 font-semibold text-lg"
                >
                  Recipes
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
