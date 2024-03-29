import EmptyToppingCard from 'components/EmptyToppingCard'
import Header from 'components/Header'
import { SliderContext } from 'components/SliderContext'
import ToppingCard from 'components/ToppingCard'
import { useToppingsQuery } from 'gql'
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import BiancoHeader1 from 'utils/typography/BiancoHeader1'
import 'react-toastify/dist/ReactToastify.css'

const Toppings = () => {
  const { data } = useToppingsQuery()
  const { isChef } = useContext(SliderContext)
  const notify = (msg: string) => {
    return toast.error(msg, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'dark',
    })
  }

  return (
    <div className="container mx-auto px-6 lg:px-24">
      <Header />
      <div className="flex flex-col justify-center py-6 lg:py-12">
        <BiancoHeader1 className="text-bianco-red sm:text-4xl">
          Toppings
        </BiancoHeader1>
        <span data-testid="topping-info">
          The world revolves around pizza. But you can't have pizza without
          toppings! View, update, create, and delete pizza toppings here! 🍕
          (Sorry, owners only)
        </span>
        <span className="font-medium text-end">
          {data?.toppings?.length || 0} toppings
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,auto))] justify-items-center">
        {!isChef && <EmptyToppingCard notify={notify} />}
        {data &&
          data.toppings.map((topping) => (
            <ToppingCard key={topping.id} topping={topping} notify={notify} />
          ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Toppings
