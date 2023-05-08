import Header from 'components/Header'
import ToppingCard from 'components/ToppingCard'
import { useToppingsQuery } from 'gql'
import React from 'react'
import BiancoHeader1 from 'utils/typography/BiancoHeader1'

const Toppings = () => {
  const { data } = useToppingsQuery()

  return (
    <div className="container mx-auto px-6 sm:px-24">
      <Header />
      <div className="flex flex-col justify-center py-6 lg:py-12">
        <BiancoHeader1 className="text-bianco-red sm:text-4xl">Toppings</BiancoHeader1>
        <div>The world revolves around pizza. View, update, create, and delete pizza toppings here! 🍕</div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,auto))]">
        {data &&
          data.toppings.map((topping) => (
            <ToppingCard key={topping.id} topping={topping} />
          ))}
      </div>
    </div>
  )
}

export default Toppings
