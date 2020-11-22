import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container disabled={loading} {...rest}>
      {loading ? <div className="loader"></div> : children}
    </Container>
  )
}

export default Button
