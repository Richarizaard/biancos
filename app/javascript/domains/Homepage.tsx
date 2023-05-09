import Header from 'components/Header'
import { SliderContext } from 'components/SliderContext'
import React, { useContext } from 'react'

const Homepage = () => {
  const { isChef } = useContext(SliderContext)
  return (
    <div className="container mx-auto px-6 sm:px-24">
      <Header />
    </div>
  )
}

export default Homepage
