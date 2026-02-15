<template>
  <v-card max-width="400" class="mx-auto">
    <v-card-title>Register</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-alert v-if="error" type="error" class="mb-4">
          {{ String(error) }}
        </v-alert>
        <v-alert v-if="success" type="success" class="mb-4">
          Account created! You can now sign in.
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
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          :error-messages="passwordMismatch ? ['Passwords do not match'] : []"
          required
        />
        <v-btn
          type="submit"
          color="primary"
          :loading="isFetching"
          :disabled="success"
          block
        >
          Register
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" @click="$emit('switch')">
        Already have an account? Sign In
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useMutation } from "villus";
import { CreateUserDocument } from "@/api/generated/types";

defineEmits<{
  switch: [];
}>();

const { data, execute, isFetching, error } = useMutation(CreateUserDocument);
const form = reactive({
  email: "",
  password: "",
});
const confirmPassword = ref("");
const success = ref(false);

const passwordMismatch = computed(
  () =>
    confirmPassword.value.length > 0 && form.password !== confirmPassword.value,
);

function handleSubmit() {
  if (passwordMismatch.value) return;
  if (!form.email || !form.password) return;

  execute({
    data: {
      email: form.email,
      password: form.password,
      status: "user",
    },
  }).then((result) => {
    if (!result.error) {
      success.value = true;
    }
  });
}
</script>
