import React, { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ToastContainer from '../components/ToastContainer'

import getMessage from '../utils/getMessage'

export interface ToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuidv4()
      const toast = { id, type, title, description }

      setMessages(old => [...old, toast])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setMessages(old => old.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error(getMessage('context.toast.use_toast.error'))
  }

  return context
}

export { ToastProvider, useToast }
