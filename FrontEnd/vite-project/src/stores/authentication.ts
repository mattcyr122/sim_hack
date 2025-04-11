import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// 🧾 Define a User type
interface User {
    id: number
    name: string
  }
  
export const useAuthenticationStore = defineStore('authentication', () => {
  
   // 🔐 Auth state with types
   const user = ref<User | null>(null)
   const token = ref<string | null>(null)
   const error = ref<string | null>(null)
   const loading = ref<boolean>(false)
 
   // 🔐 Login action (mocked)
   async function login(username: string, password: string): Promise<boolean> {
     loading.value = true
     error.value = null
 
     try {
       // Simulate API delay
       await new Promise(resolve => setTimeout(resolve, 500))
 
       // Mock login logic
       if (username === 'admin' && password === 'admin') {
         user.value = { id: 1, name: 'Admin' }
         token.value = 'fake-jwt-token'
         return true;
       } else {
         return false;
       }
     } catch (err: any) {
       error.value = err.message
       user.value = null
       token.value = null
        throw new Error('Invalid credentials')
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
  return {login,logout }
})
