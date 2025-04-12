import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '../../globals.ts' // use the global axios instance
// 🧾 Define a User type
interface User {
  id: number
  name: string
}
interface Event {
  event_id: Number
  title: string
  date: string // or `Date` if you're converting it to a Date object
  wishlist: boolean
}

interface WishlistItem {
    item_id: number;
    event_id: number;
    wishlist_name: string;
    wishlist_description: string;
    wishlist_image: string;
    cost: number;
    contributionsToItem:number;
    totalContributions:number;
  }
export const useEventItemStore = defineStore('eventItemStore', () => {
const event = ref<Event>({event_id:0,title:'a',date:'dsd',wishlist:true})
const tokens = ref<string[]>([])//user defined themes of wishlist for recommendations
const suggestions = ref<any[]>([])
const eventItems = ref<WishlistItem[]>([])


  async function getEventItems():Promise<any>{
    const payload = {eventID:event.value!.event_id}
    try {
      const response = await http.get('/getEventItems', {params:payload})
      console.log(response.data)
      eventItems.value = response.data
      return true
    } catch (err: any) {
      throw new Error(err)
    } finally {
    }

  }
  return { getEventItems,event,eventItems}
})
