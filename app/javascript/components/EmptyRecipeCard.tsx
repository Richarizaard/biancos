import React, { useState } from 'react'
import { RecipesDocument, Topping, useCreateRecipeMutation } from 'gql'
import ToppingsTag from 'components/ToppingsTag'

const EmptyRecipeCard = () => {
  // Will be empty by default
  const [name, setName] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [toppings, setToppings] = useState<Topping[]>([])

  // State to control whether or not a new recipe is being created
  const [isCreating, setIsCreating] = useState<boolean>(false)

  // Refetches all queries so recipe count/list update in real time
  const [createRecipe] = useCreateRecipeMutation({
    refetchQueries: [RecipesDocument],
  })

  const handleCreate = async () => {
    // Front end validation to disallow creation of recipe when fields aren't filled out
    if (!name || !desc) return

    const { errors } = await createRecipe({
      variables: {
        input: {
          name: name,
          description: desc,
          toppingIds: toppings.map((topping) => topping.id),
        },
      },
    })

    if (errors) {
      // Toast if recipe exists
      return <>{errors[0].message}</>
    } else {
      // Reset state so chef can create another new recipe
      resetStates()
      // Topping created toast
    }
  }

  const resetStates = () => {
    // Exit creating state
    setIsCreating(false)

    // Reset state values
    setName('')
    setDesc('')
    setToppings([])
  }

  return (
    <div
      id={'crecipe-create'}
      className="min-h-[250px] flex items-center flex-col border-2 p-2 m-4 rounded-3xl shadow-black hover:shadow-lg transition-all ease-in-out duration-300 opacity-100"
    >
      {isCreating ? (
        <>
          <textarea
            className={
              'text-center text-sm px-2 py-4 resize-none rounded-lg focus:outline-none overflow-hidden bg-white border-2 border-bianco-red'
            }
            rows={1}
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            placeholder={'Recipe'}
            required
          />
          <textarea
            className="text-sm h-full w-full px-2 py-4 resize-none rounded-lg focus:outline-none bg-white
              border-2 border-bianco-red"
            rows={5}
            value={desc}
            onChange={(e: any) => setDesc(e.target.value)}
            placeholder={'Recipe description'}
          />
          <ToppingsTag
            toppings={toppings}
            setToppings={setToppings}
            isEditOrCreate={isCreating}
          />
          <div className="flex gap-4 pt-4">
            <button
              className={`rounded-lg p-2 px-4 ${
                !name || !desc ? 'text-gray-200' : ''
              }`}
              onClick={() => handleCreate()}
              disabled={!name || !desc}
            >
              Create
            </button>
            <button
              className="rounded-lg bg-bianco-pink text-white p-2 px-4"
              onClick={() => resetStates()}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div
          className="flex cursor-pointer justify-center items-center h-full text-4xl"
          onClick={() => setIsCreating(true)}
        >
          +
        </div>
      )}
    </div>
  )
}

export default EmptyRecipeCard
