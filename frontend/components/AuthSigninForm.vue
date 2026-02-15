<template>
  <v-card max-width="400" class="mx-auto">
    <v-card-title>Sign In</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-alert v-if="error" type="error" class="mb-4">
          {{ String(error) }}
        </v-alert>
        <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          required
        />
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
        />
        <v-btn
          type="submit"
          color="primary"
          :loading="isFetching"
          block
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useMutation } from 'villus'
import { useAuthStore } from '@/stores/auth'
import { SigninDocument } from '@/api/generated/types'
import { reactive, watch } from 'vue'

const { data, execute, isFetching, error } = useMutation(SigninDocument)
const form = reactive({
  email: '',
  password: ''
})

const authStore = useAuthStore()

watch(
  () => data.value,
  (val) => {
    if (val?.signin) {
      authStore.user = val.signin
    }
  },
  { deep: true }
)

function handleSubmit() {
  execute({ data: form })
}
</script>
