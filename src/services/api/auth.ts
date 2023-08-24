import { useMutation } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import jwtDecode, { type JwtPayload } from 'jwt-decode'

import type { AuthForm, User, GenericKeys } from '@/interfaces'

import config from '@/config'

const AUTH_API = `${config.API_URL}/auth`

export function useAuthLogin() {
  return useMutation<User, AxiosError<GenericKeys>, AuthForm>({
    mutationKey: ['auth/login'],
    mutationFn: async (fields): Promise<User> => {
      const { data, headers } = await axios.post(`${AUTH_API}/login`, fields)

      const token = headers['authorization']
      const expiresIn = jwtDecode<JwtPayload>(token).exp

      const tokenOptions = expiresIn
        ? {
            expires: new Date(expiresIn * 1000)
          }
        : {}

      Cookies.set('authToken', token, tokenOptions)

      return data
    }
  })
}

export function useAuthRegister() {
  return useMutation<string, AxiosError<GenericKeys>, AuthForm>({
    mutationKey: ['auth/register'],
    mutationFn: async (fields): Promise<string> => {
      const { data } = await axios.post(`${AUTH_API}/register`, fields)

      return data
    }
  })
}
