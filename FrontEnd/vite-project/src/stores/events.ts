import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '../../globals.ts' // use the global axios instance
// 🧾 Define a User type
interface User {
  id: number
  name: string
}
interface Event {
  event_id: number
  title: string
  date: string // or `Date` if you're converting it to a Date object
  wishlist: boolean
}

export const useEventsStore = defineStore('eventsStore', () => {
const events = ref<Event[]>([])
const tokens = ref<string[]>([])//user defined themes of wishlist for recommendations
const suggestions = ref<any[]>([])
const wishlistItem = ref<any[]>([])


  async function getEvents(username:string):Promise<any>{
    const payload = {username:username}
    console.log(payload)
    try {
      const response = await http.get('/getEventsForUser', {params:payload})
      events.value = response.data
      return true
    } catch (err: any) {
      throw new Error(err)
    } finally {
    }

  }
  return { getEvents,events }
})
