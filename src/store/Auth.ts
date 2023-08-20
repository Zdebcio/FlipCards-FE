// Utilities
import { defineStore } from 'pinia'

interface AuthState {}

export const useAuthStore = defineStore('Authorization', {
  state: (): AuthState => ({})
})
