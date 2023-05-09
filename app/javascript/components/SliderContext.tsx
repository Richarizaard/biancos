import React, { ReactNode, createContext, useState } from 'react'

interface SliderContextProps {
  isChef: boolean
  setIsChef: (isChef: boolean) => void
}
export const SliderContext = createContext<SliderContextProps>({
  isChef: false,
  setIsChef: () => {},
})

interface SliderProviderProps {
  children: ReactNode
}
export const SliderProvider = ({ children }: SliderProviderProps) => {
  const [isChef, setIsChef] = useState(false)

  return (
    <SliderContext.Provider value={{ isChef, setIsChef }}>
      {children}
    </SliderContext.Provider>
  )
}
