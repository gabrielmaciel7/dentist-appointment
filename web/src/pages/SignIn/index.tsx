import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
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
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: signInFormData) => {
      formRef.current && formRef.current.setErrors({})

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required(getMessage('signin.email.required'))
            .email(getMessage('signin.email.invalid')),
          password: Yup.string().min(4, getMessage('signin.password.invalid'))
        })

        data.email = data.email.trim()

        await schema.validate(data, { abortEarly: false })

        setLoading(true)
        await signIn({
          email: data.email.toLowerCase(),
          password: data.password
        })

        history.push('/dashboard')

        addToast({
          type: 'success',
          title: 'Successful authentication.',
          description: getMessage('signin.success')
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current && formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Authentication error.',
          description: err.message
        })
      } finally {
        setLoading(false)
      }
    },
    [signIn, addToast, history]
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

            <Button type="submit" loading={loading}>
              Login
            </Button>

            <Link to="forgot-password">Forgot password?</Link>
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
