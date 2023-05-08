import React, { useState } from 'react'
import {
  Topping,
  useDeleteToppingMutation,
  useUpdateToppingMutation,
} from 'gql'

interface ToppingCardProps {
  topping: Topping
}
const ToppingCard = ({ topping }: ToppingCardProps) => {
  const [name, setName] = useState<string>(topping.name)
  const [desc, setDesc] = useState<string>(topping.description)
  const [editState, setEditState] = useState<boolean>(false)

  const [updateTopping] = useUpdateToppingMutation()
  const handleUpdate = async () => {
    // Exit edit state
    setEditState(false)

    // Update topping's name/desc
    await updateTopping({
      variables: {
        input: {
          id: topping.id,
          name: name,
          description: desc,
        },
      },
    })
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
    // Exit edit state
    setEditState(false)

    // Delete topping
    await deleteTopping({
      variables: {
        input: {
          id: topping.id,
        },
      },
    })
  }

  const handleCancel = () => {
    // Exit edit state
    setEditState(false)

    // Reset state values
    setName(topping.name)
    setDesc(topping.description)
  }

  return (
    <div
      id={'topping-' + topping.id}
      className="flex items-center flex-col border-2 p-2 m-4 rounded-3xl shadow-black hover:shadow-lg transition-all ease-in-out duration-300 opacity-100"
    >
      {/* <img
      className="rounded-full max-w-[50px]"
      src={data?.companyInfo?.imgUrl || ''}
      alt="CompanyLogo"
    /> */}
      {/* <div
        contentEditable={editState}
        suppressContentEditableWarning={true}
        onInput={(e: any) => setName(e.currentTarget.textContent || "")}
        className={`text-lg rounded-lg font-medium md:text-xl mb-3 md:mb-5 focus:outline-none ${
            editState ? 'border-2 border-bianco-red' : ''}`}
      >
        {name}
      </div> */}
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

      <div className="flex gap-4 pt-4">
        <button
          className="rounded-lg text-lev-green p-2 px-4"
          onClick={() => (editState ? handleUpdate() : setEditState(true))}
        >
          {editState ? 'Update' : 'Edit'}
        </button>
        <button
          className="rounded-lg bg-bianco-pink text-white p-2 px-4"
          onClick={() => (editState ? handleCancel() : handleDelete())}
        >
          {editState ? 'Cancel' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default ToppingCard
