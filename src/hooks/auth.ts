import { useMutation } from '@tanstack/vue-query'

import type { AuthForm, User, GenericKeys } from '@/interfaces'
import type { AxiosError } from 'axios'

import { AUTH_KEYS } from '@/constants'
import { createUser, loginUser } from '@/services/api/auth'

export function useAuthLogin() {
  return useMutation<User, AxiosError<GenericKeys>, AuthForm>({
    mutationKey: AUTH_KEYS.loginUser,
    mutationFn: loginUser
  })
}

export function useAuthRegister() {
  return useMutation<string, AxiosError<GenericKeys>, AuthForm>({
    mutationKey: AUTH_KEYS.registerUser,
    mutationFn: createUser
  })
}
