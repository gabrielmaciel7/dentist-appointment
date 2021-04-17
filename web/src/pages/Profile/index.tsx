import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
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
import api from '../../services/api'

interface ProfileFormData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { addToast } = useToast()
  const { signUp, user, updateUser } = useAuth()

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      formRef.current && formRef.current.setErrors({})

      try {
        const schema = Yup.object().shape({
          name: Yup.string().required(getMessage('signup.name.required')),
          email: Yup.string()
            .required(getMessage('signup.email.required'))
            .email(getMessage('signup.email.invalid')),
          old_password: Yup.string(),
          password: data.old_password
            ? Yup.string().min(4, getMessage('profile.update.password.invalid'))
            : Yup.string(),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            getMessage('signup.password_confirmation.invalid')
          )
        })

        await schema.validate(data, { abortEarly: false })

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation
        } = data

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                // eslint-disable-next-line indent
                old_password,
                // eslint-disable-next-line indent
                password,
                // eslint-disable-next-line indent
                password_confirmation
                // eslint-disable-next-line indent
              }
            : {})
        }

        setLoading(true)
        const response = await api.put('/profile', formData)

        updateUser(response.data)

        history.push('/dashboard')

        addToast({
          type: 'success',
          title: 'Successful update.',
          description: getMessage('profile.update.success')
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current && formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Update error.',
          description: err.message
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, history, signUp]
  )

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0]

      if (!file) return

      try {
        const data = new FormData()
        data.append('avatar', file)

        const response = await api.patch('/users/avatar', data)

        updateUser(response.data)

        addToast({
          type: 'success',
          title: 'Successful update.',
          description: getMessage('users.update.avatar.success')
        })
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Update avatar error.',
          description: err.message
        })
      }
    },
    [addToast, updateUser]
  )

  return (
    <Display>
      <Container>
        <header>
          <div>
            <Link to="/dashboard">
              <div>
                <FiArrowLeft />
                <p>Back to dashboard</p>
              </div>
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
              <label htmlFor="avatar">
                <FiCamera />

                <input
                  type="file"
                  name=""
                  id="avatar"
                  onChange={handleAvatarChange}
                />
              </label>
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
