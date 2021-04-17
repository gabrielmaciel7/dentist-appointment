import React, { createContext, useCallback, useContext, useState } from 'react'

import api from '../services/api'

import getMessage from '../utils/getMessage'

interface User {
  id: string
  name: string
  email: string
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
  updateUser(updatedUser: User): void
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
        err.message ? err.message : getMessage('server.internal_error')
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
          err.message ? err.message : getMessage('server.internal_error')
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

  const updateUser = useCallback(
    (updatedUser: User) => {
      setAuthData({
        token: authData.token,
        user: updatedUser
      })

      localStorage.setItem('@Whiteeth:user', JSON.stringify(updatedUser))
    },
    [setAuthData, authData.token]
  )

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signUp, signOut, updateUser }}
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

  if (context.user) {
    context.user.avatar_url = context.user.avatar_url
      ? context.user.avatar_url
      : 'https://github.com/github.png'
  }

  return context
}
