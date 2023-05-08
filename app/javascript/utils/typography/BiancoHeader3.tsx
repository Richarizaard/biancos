import React, { ReactNode } from 'react'

interface BiancoHeader3Props {
  children: ReactNode
  className?: string
}
const BiancoHeader3 = ({ children, className }: BiancoHeader3Props) => {
  return <h3 className={className}>{children}</h3>
}

export default BiancoHeader3
