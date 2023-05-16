import React, { useContext, useState } from 'react'
import {
  Recipe,
  Topping,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
} from 'gql'
import ToppingsTag from 'components/ToppingsTag'
import { SliderContext } from 'components/SliderContext'

interface RecipeCardProps {
  recipe: Recipe
  notify: (msg: string) => void
}
const RecipeCard = ({ recipe, notify }: RecipeCardProps) => {
  const [name, setName] = useState<string>(recipe.name)
  const [desc, setDesc] = useState<string>(recipe.description)
  const [toppings, setToppings] = useState<Topping[]>(recipe.toppings)
  const [editState, setEditState] = useState<boolean>(false)

  const { isChef } = useContext(SliderContext)

  // Flag to allow enabled update button
  const disableUpdate =
    editState &&
    name === recipe.name &&
    desc === recipe.description &&
    toppings === recipe.toppings

  const [updateRecipe] = useUpdateRecipeMutation()
  const handleUpdate = async () => {
    // Update topping's name/desc
    try {
      await updateRecipe({
        variables: {
          input: {
            id: recipe.id,
            name: name,
            description: desc,
            toppingIds: toppings.map((topping) => topping.id),
            isChef: isChef,
          },
        },
      })

      // Exit edit state if no exceptions are caught
      setEditState(false)

      // Success toast
      notify('Successfully updated recipe!')
    } catch (error: any) {
      notify(error.message)
    }
  }

  const [deleteRecipe] = useDeleteRecipeMutation({
    update: (cache, { data }) => {
      // Only continue if valid deleted topping id is returned
      if (data?.deleteRecipe?.id) {
        cache.modify({
          fields: {
            recipes(existingRecipes = [], { readField }) {
              // Filter out the deleted recipe from the cache
              return existingRecipes.filter(
                (recipeRef: Recipe) =>
                  data?.deleteRecipe?.id !== readField('id', recipeRef)
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
      await deleteRecipe({
        variables: {
          input: {
            id: recipe.id,
            isChef: isChef,
          },
        },
      })
      // Exit edit state if no exceptions are caught
      setEditState(false)

      // Success toast
      notify('Successfully deleted recipe!')
    } catch (error: any) {
      // error toast
      notify(error.message)
    }
  }

  const handleCancel = () => {
    // Exit edit state
    setEditState(false)

    // Reset state values
    setName(recipe.name)
    setDesc(recipe.description)
    setToppings(recipe.toppings)
  }

  return (
    <div
      id={'recipe-' + recipe.id}
      className="min-h-[250px] w-[250px] text-black flex items-center flex-col border-2 p-2 m-4 rounded-3xl shadow-black hover:shadow-lg transition-all ease-in-out duration-300 opacity-100"
    >
      <textarea
        disabled={!editState}
        data-testid={'recipe-name'}
        className={`text-center text-sm px-2 py-4 resize-none rounded-lg focus:outline-none overflow-hidden bg-white ${
          editState ? 'border-2 border-bianco-red' : ''
        }`}
        rows={1}
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <textarea
        disabled={!editState}
        data-testid={'recipe-desc'}
        className={`text-sm h-full w-full px-2 py-4 resize-none rounded-lg focus:outline-none bg-white ${
          editState ? 'border-2 border-bianco-red' : ''
        }`}
        rows={3}
        value={desc}
        onChange={(e: any) => setDesc(e.target.value)}
      />
      <ToppingsTag
        toppings={toppings}
        setToppings={setToppings}
        isEditOrCreate={editState}
      />
      {isChef && (
        <div className="flex gap-4 pt-4">
          <button
            data-testid={`${editState ? 'recipe-update' : 'recipe-edit'}`}
            className={`rounded-lg p-2 px-4 ${
              disableUpdate ? 'text-gray-200' : ''
            }`}
            onClick={() => (editState ? handleUpdate() : setEditState(true))}
            disabled={disableUpdate}
          >
            {editState ? 'Update' : 'Edit'}
          </button>
          <button
            data-testid={`${editState ? 'recipe-cancel' : 'recipe-delete'}`}
            className="rounded-lg bg-bianco-pink text-white p-2 px-4"
            onClick={() => (editState ? handleCancel() : handleDelete())}
          >
            {editState ? 'Cancel' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  )
}

export default RecipeCard
