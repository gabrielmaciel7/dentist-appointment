import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'

import getMessage from '../../utils/getMessage'
import getValidationErrors from '../../utils/getValidationErrors'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    formRef.current?.setErrors({})

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(getMessage('signup.name.required')),
        email: Yup.string()
          .required(getMessage('signup.email.required'))
          .email(getMessage('signup.email.invalid')),
        password: Yup.string().min(4, getMessage('signup.password.invalid')),
        passwordConfirmation: Yup.string()
          .oneOf(
            [Yup.ref('password'), null],
            getMessage('signup.password_confirmation.invalid')
          )
          .required(getMessage('signup.password_confirmation.required'))
      })

      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      const errors = getValidationErrors(err)

      formRef.current?.setErrors(errors)
    }
  }, [])

  return (
    <Container>
      <Background />

      <Content>
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
            name="passwordConfirmation"
            type="password"
            placeholder="Password confirmation"
            icon={FiLock}
          />
          <Button type="submit">Register</Button>
        </Form>

        <a href="signin">
          <FiArrowLeft />
          Back to sign in
        </a>
      </Content>
    </Container>
  )
}

export default SignUp
