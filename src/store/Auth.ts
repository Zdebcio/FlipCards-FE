// Utilities
import { defineStore } from 'pinia'

import Cookies from 'js-cookie'
import jwtDecode, { type JwtPayload } from 'jwt-decode'

import type { AuthForm, User } from '@/interfaces'

import config from '@/config'

interface AuthState {
  loggedUser: User | null
}

const authAPI = `${config.API_URL}/auth`

export const useAuthStore = defineStore('Authorization', {
  state: (): AuthState => ({
    loggedUser: null
  }),
  actions: {
    async register(fields: AuthForm) {
      await fetch(`${authAPI}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
      })
    },
    async login(fields: AuthForm) {
      const res = await fetch(`${authAPI}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
      })

      const token = res.headers.get('Authorization')

      if (token) {
        const expiresIn = jwtDecode<JwtPayload>(token).exp

        if (!expiresIn) return

        Cookies.set('authToken', token, { expires: new Date(expiresIn * 1000) })
      }
    }
  }
})
