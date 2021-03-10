import React, { useCallback, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import { useToast } from '../../hooks/toast'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background, AnimationContainer } from './styles'

import getMessage from '../../utils/getMessage'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const location = useLocation()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      formRef.current && formRef.current.setErrors({})

      try {
        const schema = Yup.object().shape({
          password: Yup.string().min(4, getMessage('reset.password.invalid')),
          password_confirmation: Yup.string()
            .oneOf(
              [Yup.ref('password'), undefined],
              getMessage('reset.password_confirmation.invalid')
            )
            .required(getMessage('reset.password_confirmation.required'))
        })

        await schema.validate(data, { abortEarly: false })

        setLoading(true)

        const { password, password_confirmation } = data
        const token = location.search.replace('?token=', '')

        if (!token) {
          throw new Error()
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token
        })

        history.push('/')

        addToast({
          type: 'success',
          title: 'Successful reset.',
          description: getMessage('reset.password.success')
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current && formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Reset password error.',
          description: err.response.data.message
            ? err.response.data.message
            : getMessage('reset.password.error')
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, history, location]
  )

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Whiteeth" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset password</h1>

            <Input
              name="password"
              type="password"
              placeholder="New password"
              icon={FiLock}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Password confirmation"
              icon={FiLock}
            />

            <Button type="submit" loading={loading}>
              Change password
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default ResetPassword
