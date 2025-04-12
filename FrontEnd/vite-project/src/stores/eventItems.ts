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
  interface Product {
    ID: number;
    actual_price: string; // e.g., "₹690"
    discount_price: string; // e.g., "₹299"
    image: string;
    link: string;
    main_category: string;
    name: string;
    no_of_ratings: number | null;
    ratings: number | null;
    similarity: number;
    sub_category: string;
  }
export const useEventItemStore = defineStore('eventItemStore', () => {
const event = ref<Event>({event_id:0,title:'a',date:'dsd',wishlist:true})
const tokens = ref<string[]>([])//user defined themes of wishlist for recommendations
const suggestions = ref<any[]>([])
const eventItems = ref<WishlistItem[]>([])
const products = ref<Product[]>([])


async function getSimilar(sentence:string):Promise<any>{
  const payload = {text:sentence,top_k:10}
  try {
    const response = await http.get('/getSimilar', {params:payload})
    products.value = response.data
    console.log(products.value)
   
    return products.value
  } catch (err: any) {
    throw new Error(err)
  } finally {
  }
}


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
  return { getEventItems,event,eventItems,getSimilar,products}
})
