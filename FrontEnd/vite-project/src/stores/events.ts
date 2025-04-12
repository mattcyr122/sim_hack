import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '../../globals.ts' // use the global axios instance
// 🧾 Define a User type
interface User {
  id: number
  name: string
}

export const useEventsStore = defineStore('eventsStore', () => {
  // 🔐 Auth state with types
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  async function getEvents(username:string):Promise<any>{
    const payload = {username:username}
    console.log(payload)
    try {
      const response = await http.get('/events/getEventsForUser', {params:payload})
      user.value = response.data.user
      return response
    } catch (err: any) {
      throw new Error(err)
    } finally {
      loading.value = false
    }

  }
  return { getEvents }
})
