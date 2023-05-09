import React, { useState } from 'react'
import { Recipe, Topping } from 'gql'

interface RecipeCardProps {
  recipe: Recipe
}
const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [name, setName] = useState<string>(recipe.name)
  const [desc, setDesc] = useState<string>(recipe.description)
  //   const [ingredients, setIngredients] = useState<Topping[]>(recipe.toppings)
  const [editState, setEditState] = useState<boolean>(false)
  const disableUpdate =
    editState && name === recipe.name && desc === recipe.description

  //   const [updateTopping] = useUpdateToppingMutation()
  const handleUpdate = async () => {
    // Exit edit state
    setEditState(false)

    // Update topping's name/desc
    //   await updateTopping({
    //     variables: {
    //       input: {
    //         id: topping.id,
    //         name: name,
    //         description: desc,
    //       },
    //     }, Maybe<Array<Recipe>>
    //   })
  }

  // const [deleteTopping] = useDeleteToppingMutation({
  //   update: (cache, { data }) => {
  //     // Only continue if valid deleted topping id is returned
  //     if (data?.deleteTopping?.id) {
  //       cache.modify({
  //         fields: {
  //           toppings(existingToppings = [], { readField }) {
  //             // Filter out the deleted topping from the cache
  //             return existingToppings.filter(
  //               (toppingRef: Topping) =>
  //                 data?.deleteTopping?.id !== readField('id', toppingRef)
  //             )
  //           },
  //         },
  //       })
  //     }
  //   },
  // })
  const handleDelete = async () => {
    // Exit edit state
    setEditState(false)

    //   // Delete topping
    //   await deleteTopping({
    //     variables: {
    //       input: {
    //         id: topping.id,
    //       },
    //     },
    //   })
  }

  const handleCancel = () => {
    // Exit edit state
    setEditState(false)

    // Reset state values
    setName(recipe.name)
    setDesc(recipe.description)
  }

  return (
    <div
      id={'recipe-' + recipe.id}
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
        rows={3}
        value={desc}
        onChange={(e: any) => setDesc(e.target.value)}
      />
      {/* <div className="w-full flex justify-start">
        {' '}
        {recipe.toppings?.map((topping) => {
          return <div className="border-2 px-2 m-1 border-bianco-salmon text-bianco-red rounded-lg" key={topping.id}>{topping.name}</div>
        })}
      </div> */}

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
          onClick={() => (editState ? handleCancel() : handleDelete())}
        >
          {editState ? 'Cancel' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default RecipeCard
