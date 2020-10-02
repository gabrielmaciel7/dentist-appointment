import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background, AnimationContainer } from './styles'

import getMessage from '../../utils/getMessage'
import getValidationErrors from '../../utils/getValidationErrors'

interface SignUpFormData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { addToast } = useToast()
  const { signUp } = useAuth()

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      formRef.current && formRef.current.setErrors({})

      try {
        const schema = Yup.object().shape({
          name: Yup.string().required(getMessage('signup.name.required')),
          email: Yup.string()
            .required(getMessage('signup.email.required'))
            .email(getMessage('signup.email.invalid')),
          password: Yup.string().min(4, getMessage('signup.password.invalid')),
          password_confirmation: Yup.string()
            .oneOf(
              [Yup.ref('password'), undefined],
              getMessage('signup.password_confirmation.invalid')
            )
            .required(getMessage('signup.password_confirmation.required'))
        })

        await schema.validate(data, { abortEarly: false })

        await signUp({
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation
        })

        history.push('/')

        addToast({
          type: 'success',
          title: 'Successful registration.',
          description: getMessage('signup.success')
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current && formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'User creation error.',
          description: err.message
        })
      }
    },
    [addToast, history, signUp]
  )

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Whiteeth" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign up</h1>

            <Input name="name" placeholder="Name" icon={FiUser} />
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              icon={FiLock}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Password confirmation"
              icon={FiLock}
            />
            <Button type="submit">Register</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Back to sign in
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
