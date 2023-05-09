import Header from 'components/Header'
import { SliderContext } from 'components/SliderContext'
import React, { useContext } from 'react'

const Homepage = () => {
  const { isChef } = useContext(SliderContext)
  return (
    <div className="container mx-auto px-6 sm:px-24">
      <Header />
      <div>{isChef ? 'I am a chef' : 'I am an owner'}</div>
    </div>
  )
}

export default Homepage
