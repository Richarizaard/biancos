import useOnClickOutside from 'utils/hooks/useOnClickOutside'
import { Topping, useToppingsQuery } from 'gql'
import React, { useEffect, useRef, useState } from 'react'

interface ToppingsTagProps {
  toppings: Topping[]
  setToppings: React.Dispatch<React.SetStateAction<Topping[]>>
  isEditOrCreate: boolean
}

// This component handles the updating of state vars for toppings
// This does NOT call any mutations. Mutations are handled in the parent component
const ToppingsTag = ({
  toppings,
  setToppings,
  isEditOrCreate,
}: ToppingsTagProps) => {
  const { data } = useToppingsQuery()
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)

  useEffect(() => {
    if (!isEditOrCreate) setOpenDropdown(false)
  }, [isEditOrCreate])

  // Appends added topping to state array and closes dropdown
  const handleAddTag = (addedTopping: Topping) => {
    const combinedToppings = [...toppings, addedTopping]
    setToppings(combinedToppings)
    setOpenDropdown(false)
  }

  // Removes ropping from state array and closes dropdown
  const handleRemoveTag = (removedTopping: Topping) => {
    const combinedToppings = toppings.filter(
      (topping) => topping.id !== removedTopping.id
    )
    setToppings(combinedToppings)
    setOpenDropdown(false)
  }

  // Filters selected toppings from all toppings to keep topping selection
  // in dropdown updated.
  const filteredToppings = data?.toppings.filter(
    (topping) => !toppings.some((existing) => existing.id === topping.id)
  )

  const ref = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(ref, () => setOpenDropdown(false))

  return (
    <div className="w-full flex flex-wrap justify-start py-2">
      {toppings.map((topping) => {
        return (
          <div
            key={topping.id}
            className="border-2 px-1 m-1 border-bianco-salmon text-white bg-bianco-pink rounded-lg flex gap-1"
          >
            <div className="" key={topping.id}>
              {topping.name}
            </div>
            {isEditOrCreate && (
              <div
                data-testid="delete-topping-tag"
                className="cursor-pointer text-sm flex items-center"
                onClick={() => handleRemoveTag(topping)}
              >
                x
              </div>
            )}
          </div>
        )
      })}
      {isEditOrCreate && !openDropdown && filteredToppings && filteredToppings.length > 0 && (
        <div className="relative flex items-center">
          <div
            data-testid="add-topping-tag"
            className="px-2 cursor-pointer flex items-center"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            +
          </div>
        </div>
      )}
      {openDropdown && (
        <div
          ref={ref}
          data-testid="topping-dropdown"
          className="relative py-1 px-2 w-1/3"
        >
          <div className="max-h-[150px] sm:max-h-[250px] overflow-scroll border-2 p-2 border-bianco-salmon text-bianco-red rounded-lg bg-white flex flex-col absolute">
            {filteredToppings?.map((topping) => {
              return (
                <div
                  key={topping.id}
                  className="hover:bg-gray-200 rounded-lg cursor-pointer px-1"
                  onClick={() => handleAddTag(topping)}
                >
                  {topping.name}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ToppingsTag
