import React, { useCallback } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'

import getMessage from '../../helpers/getMessage'

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(getMessage('signup.name.required')),
        email: Yup.string()
          .required(getMessage('signup.email.required'))
          .email(getMessage('signup.email.invalid')),
        password: Yup.string()
          .min(4, getMessage('signup.password.invalid'))
          .required(getMessage('signup.password.required'))
        // passwordConfirmation: Yup.string()
        //   .min(4)
        //   .oneOf(
        //     [Yup.ref('password'), null],
        //     getMessage('signup.password_confirmation.invalid')
        //   )
        //   .required(getMessage('signup.password_confirmation.required'))
      })

      await schema.validate(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="Whiteeth" />

        <Form onSubmit={handleSubmit}>
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
