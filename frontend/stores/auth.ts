import { defineStore } from 'pinia'
import type { AuthUserFragment } from '@/api/generated/types'

export type AuthState = {
  user: AuthUserFragment | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    user: null
  })
})
