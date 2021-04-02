import React, { createContext, useCallback, useContext, useState } from 'react'

import api from '../services/api'

import getMessage from '../utils/getMessage'

interface User {
  id: string
  name: string
  avatar_url: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface SignUpCredentials {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface SignInData {
  token: string
  user: User
}

interface AuthContextData {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signUp(credentials: SignUpCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<SignInData>(() => {
    const token = localStorage.getItem('@Whiteeth:token')
    const user = localStorage.getItem('@Whiteeth:user')

    if (!token || !user) return {} as SignInData

    api.defaults.headers.authorization = `Bearer ${token}`

    return { token, user: JSON.parse(user) }
  })

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post<SignInData>('sessions', {
        email,
        password
      })

      const { token, user } = response.data

      localStorage.setItem('@Whiteeth:token', token)
      localStorage.setItem('@Whiteeth:user', JSON.stringify(user))

      api.defaults.headers.authorization = `Bearer ${token}`

      setAuthData({ token, user })
    } catch (err) {
      throw new Error(
        err.response.data.message
          ? err.response.data.message
          : getMessage('server.internal_error')
      )
    }
  }, [])

  const signUp = useCallback(
    async ({ name, email, password, password_confirmation }) => {
      try {
        await api.post('/users', {
          name,
          email,
          password,
          password_confirmation
        })
      } catch (err) {
        throw new Error(
          err.response.data.message
            ? err.response.data.message
            : getMessage('server.internal_error')
        )
      }
    },
    []
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('@Whiteeth:token')
    localStorage.removeItem('@Whiteeth:user')

    setAuthData({} as SignInData)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signUp, signOut }}
    >
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
