import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  useState
} from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  const handleInputBlur = useCallback(() => {
    setIsFilled(!!inputRef.current.value)
  }, [])

  return (
    <Container hasError={!!error} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle />
        </Error>
      )}
    </Container>
  )
}

export default Input
