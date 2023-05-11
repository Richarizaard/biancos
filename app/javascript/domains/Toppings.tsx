import EmptyToppingCard from 'components/EmptyToppingCard'
import Header from 'components/Header'
import { SliderContext } from 'components/SliderContext'
import ToppingCard from 'components/ToppingCard'
import { useToppingsQuery } from 'gql'
import React, { useContext, useState } from 'react'
import BiancoHeader1 from 'utils/typography/BiancoHeader1'

const Toppings = () => {
  const { data } = useToppingsQuery()
  const { isChef } = useContext(SliderContext)

  return (
    <div className="container mx-auto px-6 sm:px-24">
      <Header />
      <div className="flex flex-col justify-center py-6 lg:py-12">
        <BiancoHeader1 className="text-bianco-red sm:text-4xl">
          Toppings
        </BiancoHeader1>
        <span>
          The world revolves around pizza. But you can't have pizza without toppings! View, update, create, and delete
          pizza toppings here! 🍕 (Sorry, owners only)
        </span>
        <span className="font-medium text-end">{data?.toppings?.length} toppings</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,auto))]">
        {!isChef && <EmptyToppingCard />}
        {data &&
          data.toppings.map((topping) => (
            <ToppingCard key={topping.id} topping={topping} />
          ))}
      </div>
    </div>
  )
}

export default Toppings
