import React, { useContext, useState } from 'react'
import { ToppingsDocument, useCreateToppingMutation } from 'gql'
import { SliderContext } from 'components/SliderContext'

interface EmptyToppingCardProps {
  notify: (msg: string) => void
}
const EmptyToppingCard = ({ notify }: EmptyToppingCardProps) => {
  // Will be empty by default
  const [name, setName] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const { isChef } = useContext(SliderContext)

  // State to control whether or not a new topping is being created
  const [isCreating, setIsCreating] = useState<boolean>(false)

  // Refetches all queries so topping count/list update in real time
  const [createTopping] = useCreateToppingMutation({
    refetchQueries: [ToppingsDocument],
  })

  //
  const handleCreate = async () => {
    // Front end validation to disallow creation of topping when fields aren't filled out
    if (!name || !desc) return

    try {
      await createTopping({
        variables: {
          input: {
            name: name,
            description: desc,
            isChef: isChef,
          },
        },
      })

      // Exit edit state if no exceptions are caught
      resetStates()

      // Success toast
      notify('Successfully created topping!')
    } catch (error: any) {
      // error toast
      notify(error.message)
    }
  }

  const resetStates = () => {
    // Exit creating state
    setIsCreating(false)

    // Reset state values
    setName('')
    setDesc('')
  }

  return (
    <div
      id={'topping-create'}
      data-testid="empty-topping-card"
      className="min-h-[250px] w-[250px] text-black flex items-center flex-col border-2 p-2 m-4 rounded-3xl shadow-black hover:shadow-lg transition-all ease-in-out duration-300 opacity-100"
    >
      {isCreating ? (
        <>
          <textarea
            data-testid="empty-topping-card-name"
            className={
              'text-center text-sm px-2 py-4 resize-none rounded-lg focus:outline-none overflow-hidden bg-white border-2 border-bianco-red'
            }
            rows={1}
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            placeholder={'Topping'}
            required
          />
          <textarea
            data-testid="empty-topping-card-desc"
            className="text-sm h-full w-full px-2 py-4 resize-none rounded-lg focus:outline-none bg-white
              border-2 border-bianco-red"
            rows={5}
            value={desc}
            onChange={(e: any) => setDesc(e.target.value)}
            placeholder={'Topping description'}
          />

          <div className="flex gap-4 pt-4">
            <button
              data-testid="empty-topping-card-create-button"
              className={`rounded-lg p-2 px-4 ${
                !name || !desc ? 'text-gray-200' : ''
              }`}
              onClick={() => handleCreate()}
              disabled={!name || !desc}
            >
              Create
            </button>
            <button
              data-testid="empty-topping-card-cancel-button"
              className="rounded-lg bg-bianco-pink text-white p-2 px-4"
              onClick={() => resetStates()}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div
          data-testid="add-topping"
          className="flex cursor-pointer justify-center items-center h-full text-4xl"
          onClick={() => setIsCreating(true)}
        >
          +
        </div>
      )}
    </div>
  )
}

export default EmptyToppingCard
