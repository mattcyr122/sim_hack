<script setup lang="ts">
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const error = ref<boolean>(false)
const auth = useAuthenticationStore()

const router = useRouter()

const handleLogin = async () => {
  router.push('/home')
  try {
    const value = await auth.login(username.value, password.value)
    console.log(value)
    if (value.data.authentication) {
      //push route
      error.value = false
      errorMessage.value = ''
      router.push('/home')
    } else {
      //handle incorrect username/ password
      error.value = true
      errorMessage.value = 'Incorrect username/password'
    }
  } catch (error) {
    //handle error(network)
    error.value = true
    errorMessage.value = 'Network Error, please try again'
  }
}
</script>

<template>
  <div class="container">
    <Card class="centered-div">
      <template #title>Login to santa's helpers</template>
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
              :feedback="false"
              placeholder="Enter password"
            />
          </div>

          <Button label="Login" icon="pi pi-sign-in" :loading="auth.loading" @click="handleLogin" />

          <Message v-if="error" severity="error" class="mt-2">
            {{ errorMessage }}
          </Message>

          <Message v-if="auth.user" severity="success" class="mt-2">
            Welcome, {{ auth.user.name }}!
          </Message>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Full viewport height */
  width: 100vw;
  margin: 0; /* Remove any default margin */
  background: linear-gradient(145deg, #FFFDF7, #FFD70010);
  padding: 1 rem;
}

.centered-div {
  /*width: 500px; /* Adjust width as needed */
  /*height: 320px; /* Adjust height as needed */
  background-color: #FFFDF7;
  border: 2px solid #FFD700;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 420px;
}

label {
  color: #212121;
  font-weight: 600;
}

.p-inputtext,
.p-password {
  border: 2px solid #FFD700;
  border-radius: 8px;
  padding: 0.5rem;
  background-color: #fff;
  color: #212121;
}

.p-inputtext:focus,
.p-password input:focus {
  border-color: #C62828;
  box-shadow: 0 0 0 2px rgba(198, 40, 40, 0.2);
}

.p-button {
  background-color: #C62828;
  border: none;
  color: #FFFDF7;
  font-weight: bold;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  transition: background-color 0.3s ease;
}

.p-button:hover {
  background-color: #a32121;
}

.p-message {
  border-radius: 8px;
}

.p-message-error {
  background-color: #ffcdd2;
  color: #C62828;
  border-color: #C62828;
}

.p-message-success {
  background-color: #c8e6c9;
  color: #2E7D32;
  border-color: #2E7D32;
}
</style>
