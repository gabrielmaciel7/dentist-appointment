import React, { createContext, useCallback, useContext, useState } from 'react'

import api from '../services/api'

import getMessage from '../utils/getMessage'

interface SignInCredentials {
  email: string
  password: string
}

interface SignInData {
  token: string
  user: Record<string, unknown>
}

interface AuthContextData {
  user: Record<string, unknown>
  signIn(credentials: SignInCredentials): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<SignInData>(() => {
    const token = localStorage.getItem('@Whiteeth:token')
    const user = localStorage.getItem('@Whiteeth:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as SignInData
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<SignInData>('sessions', { email, password })

    const { token, user } = response.data

    localStorage.setItem('@Whiteeth:token', token)
    localStorage.setItem('@Whiteeth:user', JSON.stringify(user))

    setAuthData({ token, user })
  }, [])

  return (
    <AuthContext.Provider value={{ user: authData.user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(getMessage('context.auth.use_auth.error'))
  }

  return context
}
