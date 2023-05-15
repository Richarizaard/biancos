import React, { useContext } from 'react'
import { SliderContext } from './SliderContext'

const SliderButton = () => {
  const { isChef, setIsChef } = useContext(SliderContext)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChef(event.target.checked)
  }

  return (
    <label className="relative flex justify-between items-center p-2 text-xl">
      <input
        type="checkbox"
        data-testid="role-button"
        className="absolute cursor-pointer left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
        checked={isChef}
        onChange={handleSliderChange}
      />
      <span className="cursor-pointer w-16 h-10 flex items-center flex-shrink-0 p-1 bg-bianco-red rounded-full duration-300 ease-in-out after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
    </label>
  )
}

export default SliderButton
