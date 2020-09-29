import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useAuth } from '../../contexts/AuthContext'
import getMessage from '../../utils/getMessage'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Content, Background } from './styles'

interface signInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { signIn, user } = useAuth()

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

        signIn({ email: data.email, password: data.password })
      } catch (err) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    },
    [signIn]
  )

  return (
    <Container>
      <Content>
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

        <a href="signup">
          <FiLogIn />
          Create an account
        </a>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
