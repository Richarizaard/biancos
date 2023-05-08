import React, { ReactNode } from 'react'

interface BiancoHeader2Props {
  children: ReactNode
  className?: string
}
const BiancoHeader2 = ({ children, className }: BiancoHeader2Props) => {
  return <h2 className={className}>{children}</h2>
}

export default BiancoHeader2
