import { defineStore } from "pinia"
import { ref } from 'vue'


const useUserStore = defineStore('user', () => {
  const userId = ref<string>('')

  return {
    userId
  }
})

export default useUserStore