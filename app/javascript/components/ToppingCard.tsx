import React, { useContext, useState } from 'react'
import {
  Topping,
  useDeleteToppingMutation,
  useUpdateToppingMutation,
} from 'gql'
import { SliderContext } from 'components/SliderContext'

interface ToppingCardProps {
  topping: Topping
  notify: (msg: string) => void
}
const ToppingCard = ({ topping, notify }: ToppingCardProps) => {
  // Set initial states
  const [name, setName] = useState<string>(topping.name)
  const [desc, setDesc] = useState<string>(topping.description)
  const [editState, setEditState] = useState<boolean>(false)

  const { isChef } = useContext(SliderContext)

  // Flag to allow enabled update button
  const disableUpdate =
    editState && name === topping.name && desc === topping.description

  const [updateTopping] = useUpdateToppingMutation()
  const handleUpdate = async () => {
    // Update topping's name/desc
    try {
      await updateTopping({
        variables: {
          input: {
            id: topping.id,
            name: name,
            description: desc,
            isChef: isChef
          },
        },
      })

      // Exit edit state if no exceptions are caught
      setEditState(false)

      // Success toast
      notify('Successfully updated topping!')
    } catch (error: any) {
      // error toast
      notify(error.message)
    }
  }

  const [deleteTopping] = useDeleteToppingMutation({
    update: (cache, { data }) => {
      // Only continue if valid deleted topping id is returned
      if (data?.deleteTopping?.id) {
        cache.modify({
          fields: {
            toppings(existingToppings = [], { readField }) {
              // Filter out the deleted topping from the cache
              return existingToppings.filter(
                (toppingRef: Topping) =>
                  data?.deleteTopping?.id !== readField('id', toppingRef)
              )
            },
          },
        })
      }
    },
  })

  const handleDelete = async () => {
    try {
      // Delete topping
      await deleteTopping({
        variables: {
          input: {
            id: topping.id,
            isChef: isChef
          },
        },
      })
      // Exit edit state if no exceptions are caught
      setEditState(false)

      // Success toast
      notify('Successfully deleted topping!')
    } catch (error: any) {
      // error toast
      notify(error.message)
    }
  }

  const resetStates = () => {
    // Exit edit state
    setEditState(false)

    // Reset state values
    setName(topping.name)
    setDesc(topping.description)
  }

  return (
    <div
      id={'topping-' + topping.id}
      className="min-h-[250px] flex items-center flex-col border-2 p-2 m-4 rounded-3xl shadow-black hover:shadow-lg transition-all ease-in-out duration-300 opacity-100"
    >
      <textarea
        disabled={!editState}
        className={`text-center text-sm px-2 py-4 resize-none rounded-lg focus:outline-none overflow-hidden bg-white ${
          editState ? 'border-2 border-bianco-red' : ''
        }`}
        rows={1}
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <textarea
        disabled={!editState}
        className={`text-sm h-full w-full px-2 py-4 resize-none rounded-lg focus:outline-none bg-white ${
          editState ? 'border-2 border-bianco-red' : ''
        }`}
        rows={5}
        value={desc}
        onChange={(e: any) => setDesc(e.target.value)}
      />
      {!isChef && (
        <div className="flex gap-4 pt-4">
          <button
            className={`rounded-lg p-2 px-4 ${
              disableUpdate ? 'text-gray-200' : ''
            }`}
            onClick={() => (editState ? handleUpdate() : setEditState(true))}
            disabled={disableUpdate}
          >
            {editState ? 'Update' : 'Edit'}
          </button>
          <button
            className="rounded-lg bg-bianco-pink text-white p-2 px-4"
            onClick={() => (editState ? resetStates() : handleDelete())}
          >
            {editState ? 'Cancel' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ToppingCard
