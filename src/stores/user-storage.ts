import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuth } from "firebase/auth";

const useUserStore = defineStore("user", () => {
  const userId = ref<string>(getAuth().currentUser?.uid ?? "");

  return {
    userId,
  };
});

export default useUserStore;
