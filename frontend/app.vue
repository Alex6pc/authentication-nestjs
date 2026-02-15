<template>
  <v-app>
    <v-main>
      <v-container fluid class="pn-container">
        <AuthProfileCard v-if="authStore.user" />
        <template v-else>
          <AuthRegisterForm
            v-if="showRegister"
            @switch="showRegister = false"
          />
          <div v-else>
            <AuthSigninForm />
            <div class="text-center mt-4">
              <v-btn variant="text" @click="showRegister = true">
                Don't have an account? Register
              </v-btn>
            </div>
          </div>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const showRegister = ref(false);
</script>

<style lang="css" scoped>
.pn-container {
  padding: 32px;
}
</style>
