import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useToast } from '../../hooks/toast'

import getMessage from '../../utils/getMessage'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Content, Background, AnimationContainer } from './styles'
import api from '../../services/api'

interface forgotPasswordFormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: forgotPasswordFormData) => {
      formRef.current && formRef.current.setErrors({})

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required(getMessage('signin.email.required'))
            .email(getMessage('signin.email.invalid'))
        })

        await schema.validate(data, { abortEarly: false })

        setLoading(true)
        await api.post('/password/forgot', {
          email: data.email
        })

        history.push('/')

        addToast({
          type: 'success',
          title: 'Email successfully sent.',
          description: getMessage('forgot.email.success')
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current && formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Password recovery error.',
          description: err.response.data.message
            ? err.response.data.message
            : getMessage('server.internal_error')
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Whiteeth" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Password recovery</h1>

            <Input name="email" placeholder="E-mail" icon={FiMail} />

            <Button type="submit" loading={loading}>
              Recover
            </Button>
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

export default ForgotPassword
