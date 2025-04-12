import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '../../globals.ts' // use the global axios instance
// 🧾 Define a User type
interface User {
  id: number
  name: string
}

export const useAuthenticationStore = defineStore('authentication', () => {
  // 🔐 Auth state with types
  const user = ref<User | null>({id:2,name:'bob456'})
  const token = ref<string | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  // 🔐 Login action (mocked)
  async function login(username: string, password: string): Promise<boolean | any> {
    loading.value = true
    error.value = null
    const credentials = { username: username, password: password }
    console.log(credentials)
    try {
      const response = await http.post('/login', credentials)
      user.value = response.data.user
      return response
    } catch (err: any) {
      throw new Error(err)
    } finally {
      loading.value = false
    }
  }

  // 🔓 Logout
  function logout(): void {
    user.value = null
    token.value = null
    error.value = null
  }
  return { login, logout,user }
})
