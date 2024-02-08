'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { XHeading2 } from '@/components/data-display/heading2/XHeading2'
import { XInput } from '@/components/forms'
import { XButton } from '@/components/general/button/XButton'
import type { UserCredentials } from '@/entities/common'
import { useAuthContext } from '@/lib/auth/auth'
import { defineSchema, useForm, useFormError } from '@/lib/form'
import { LoadingState } from '@/components/general'

export type LoginForm = UserCredentials

/**
 * Define schema for form validation
 */
const loginFormSchema = defineSchema<LoginForm>((rule) => ({
  username: rule.string().required('Username is required field'),
  password: rule.string().required('Password is required field'),
}))

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuthContext()

  const router = useRouter()

  // Define initial value for form
  const initialLoginForm = {
    username: 'phucnguyen@besmartee.com',
    password: 'Abc12345',
  }

  const form = useForm<LoginForm>({
    /**
     * Set initial values for form
     */
    initialValues: initialLoginForm,

    /**
     * Set schema for validation
     */
    validationSchema: loginFormSchema,

    /**
     * Handle submit form
     * @param values
     */
    onSubmit: (values) => {
      login(values).then(() => router.push(`/dashboard`))
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isLoading, isAuthenticated])

  const formError = useFormError(form)

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="mx-auto mt-12 max-w-sm">
      <XHeading2 className="mb-6 text-center">Login</XHeading2>

      <form onSubmit={form.handleSubmit}>
        <XInput
          id="username"
          name="username"
          label="Username"
          placeholder="Username"
          onChange={form.handleChange}
          defaultValue={form.values.username}
          error={formError('username')}
        />

        <XInput
          type="password"
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          onChange={form.handleChange}
          defaultValue={form.values.password}
          error={formError('password')}
        />

        <div>
          <XButton type="submit">Login</XButton>
        </div>
      </form>
    </div>
  )
}
