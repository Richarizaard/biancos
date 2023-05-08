import React, { ReactNode } from 'react'

interface BiancoHeader1Props {
  children: ReactNode
  className?: string
}
const BiancoHeader1 = ({ children, className }: BiancoHeader1Props) => {
  return <h1 className={className}>{children}</h1>
}

export default BiancoHeader1
