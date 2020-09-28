import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Whiteeth" />

        <form>
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
        </form>

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
