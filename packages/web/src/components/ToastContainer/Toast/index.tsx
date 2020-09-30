import React, { useEffect, useRef } from 'react'
import { animated } from 'react-spring'
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'

import { useToast, ToastMessage } from '../../../hooks/toast'

import { Container } from './styles'

interface ToastProps {
  message: ToastMessage
  style: Record<string, unknown>
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const AnimatedContainer = animated(Container)

  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, message.id])

  return (
    <AnimatedContainer
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </AnimatedContainer>
  )
}

export default Toast
