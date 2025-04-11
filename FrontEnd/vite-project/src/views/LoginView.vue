<script setup lang="ts">
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'

const username = ref('')
const password = ref('')
const auth = useAuthenticationStore()

const handleLogin = async () => {
 const value =  await auth.login(username.value, password.value)

}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <Card class="w-full max-w-sm shadow-2xl">
      <template #title>Login</template>
      <template #content>
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium mb-1">Username</label>
            <InputText
              id="username"
              v-model="username"
              class="w-full"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-1">Password</label>
            <Password
              id="password"
              v-model="password"
              class="w-full"
              toggleMask
              feedback={false}
              placeholder="Enter password"
            />
          </div>

          <Button
            label="Login"
            icon="pi pi-sign-in"
            class="w-full"
            :loading="auth.loading"
            @click="handleLogin"
          />

          <Message v-if="auth.error" severity="error" class="mt-2">
            {{ auth.error }}
          </Message>

          <Message v-if="auth.user" severity="success" class="mt-2">
            Welcome, {{ auth.user.name }}!
          </Message>
        </div>
      </template>
    </Card>
  </div>
</template>
