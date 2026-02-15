<template>
  <v-card v-if="authStore.user" max-width="400" class="mx-auto">
    <v-card-title>Profile</v-card-title>
    <v-card-text>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
      <p><strong>Status:</strong> {{ authStore.user.status }}</p>
      <v-btn color="error" @click="handleSignOut" :loading="isFetching">
        Sign Out
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useMutation } from 'villus'
import { useAuthStore } from '@/stores/auth'
import { SignOutDocument } from '@/api/generated/types'

const authStore = useAuthStore()
const { execute, isFetching } = useMutation(SignOutDocument)

function handleSignOut() {
  execute({}).then((result) => {
    if (!result.error) {
      authStore.user = null
    }
  })
}
</script>
