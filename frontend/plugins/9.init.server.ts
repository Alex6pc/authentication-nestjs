import { useQuery } from 'villus'
import { useAuthStore } from '@/stores/auth'
import { MeDocument } from '@/api/generated/types'

export default defineNuxtPlugin(async () => {
  try {
    const authStore = useAuthStore()
    const { data, error } = await useQuery({ query: MeDocument })
    
    if (!error.value && data.value?.me) {
      authStore.user = data.value.me
    }
  } catch (e) {
    console.warn('[SSR] Could not initialize auth:', e instanceof Error ? e.message : e)
  }
})
