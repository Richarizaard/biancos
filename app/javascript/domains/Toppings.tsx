import Header from 'components/Header'
import Topping from 'domains/Topping'
import { useToppingsQuery } from 'gql'
import React from 'react'

const Toppings = () => {
  const { data } = useToppingsQuery()

  return (
    <div className="container mx-auto px-6 sm:px-24">
      <Header />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(275px,auto))]">
        {data &&
          data.toppings.map((topping) => (
            <Topping key={topping.id} topping={topping} />
          ))}
      </div>
    </div>
  )
}

export default Toppings
