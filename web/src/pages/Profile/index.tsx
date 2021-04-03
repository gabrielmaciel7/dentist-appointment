import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Display, Container, Content, AvatarInput } from './styles'

import getMessage from '../../utils/getMessage'
import getValidationErrors from '../../utils/getValidationErrors'

interface ProfileFormData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { addToast } = useToast()
  const { signUp, user } = useAuth()

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      formRef.current && formRef.current.setErrors({})

      try {
        const schema = Yup.object().shape({
          name: Yup.string().required(getMessage('signup.name.required')),
          email: Yup.string()
            .required(getMessage('signup.email.required'))
            .email(getMessage('signup.email.invalid')),
          old_password: Yup.string().min(
            4,
            getMessage('signup.password.invalid')
          ),
          password: Yup.string().min(4, getMessage('signup.password.invalid')),
          password_confirmation: Yup.string()
            .oneOf(
              [Yup.ref('password'), undefined],
              getMessage('signup.password_confirmation.invalid')
            )
            .required(getMessage('signup.password_confirmation.required'))
        })

        await schema.validate(data, { abortEarly: false })

        setLoading(true)
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
      } finally {
        setLoading(false)
      }
    },
    [addToast, history, signUp]
  )

  return (
    <Display>
      <Container>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
              <p>Back to dashboard</p>
            </Link>
          </div>
        </header>

        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <button type="button">
                <FiCamera />
              </button>
            </AvatarInput>

            <h1>My profile</h1>

            <Input name="name" placeholder="Name" icon={FiUser} />
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="old_password"
              type="password"
              placeholder="Old password"
              icon={FiLock}
            />
            <Input
              name="password"
              type="password"
              placeholder="New password"
              icon={FiLock}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="New password confirmation"
              icon={FiLock}
            />

            <Button type="submit" loading={loading}>
              Confirm changes
            </Button>
          </Form>
        </Content>
      </Container>
    </Display>
  )
}

export default Profile
