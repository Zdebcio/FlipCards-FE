import { useMutation } from '@tanstack/vue-query'

import type { AuthForm, User, GenericKeys } from '@/interfaces'
import type { AxiosError } from 'axios'

import { authKeys } from '@/constants/queryKeys'
import { createUser, loginUser } from '@/services/api/auth'

export function useAuthLogin() {
  return useMutation<User, AxiosError<GenericKeys>, AuthForm>({
    mutationKey: authKeys.loginUser,
    mutationFn: loginUser
  })
}

export function useAuthRegister() {
  return useMutation<string, AxiosError<GenericKeys>, AuthForm>({
    mutationKey: authKeys.registerUser,
    mutationFn: createUser
  })
}
