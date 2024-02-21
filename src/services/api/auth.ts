import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode, { type JwtPayload } from 'jwt-decode'

import type { AuthForm, User } from '@/interfaces'

import config from '@/config'

const AUTH_API = `${config.API_URL}/auth`

export const loginUser = async (fields: AuthForm): Promise<User> => {
  const { data, headers } = await axios.post(`${AUTH_API}/login`, fields)

  const token = headers['authorization']
  const expiresIn = jwtDecode<JwtPayload>(token).exp

  const tokenOptions = expiresIn
    ? {
        secure: true,
        expires: new Date(expiresIn * 1000)
      }
    : {}

  Cookies.set('authToken', token.replace(/^Bearer\s/, ''), tokenOptions)

  return data
}

export const createUser = async (fields: AuthForm): Promise<string> => {
  const { data } = await axios.post(`${AUTH_API}/register`, fields)

  return data
}
