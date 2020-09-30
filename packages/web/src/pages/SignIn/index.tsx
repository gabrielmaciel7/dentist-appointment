import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import getMessage from '../../utils/getMessage'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Content, Background, AnimationContainer } from './styles'

interface signInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn, user } = useAuth()
  const { addToast } = useToast()

  console.log(user)

  const handleSubmit = useCallback(
    async (data: signInFormData) => {
      formRef.current?.setErrors({})

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required(getMessage('signin.email.required'))
            .email(getMessage('signin.email.invalid')),
          password: Yup.string().min(4, getMessage('signin.password.invalid'))
        })

        await schema.validate(data, { abortEarly: false })

        await signIn({ email: data.email, password: data.password })
      } catch (err) {
        const description = []

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          err.errors.forEach(error => description.push(error))
        } else {
          description.push(err.message)
        }

        description.forEach(description => {
          addToast({
            type: 'error',
            title: 'Authentication error.',
            description
          })
        })
      }
    },
    [signIn, addToast]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Whiteeth" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign in</h1>

            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              icon={FiLock}
            />
            <Button type="submit">Login</Button>

            <a href="forgot">Forgot password?</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Create an account
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
