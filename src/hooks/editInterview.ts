import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRoute } from "vue-router";
import useUserStore from "../stores/user-storage";
import type { Interview, Stage } from "../stores/interviews-storage";
import { ref, computed } from "vue";

export default function useEditInterview() {
      const route = useRoute();
      const db = getFirestore();
      const userStore = useUserStore();
      const docRef = doc(db, `users/${userStore.userId}/interviews`, route.params.id as string);

      const interview = ref<Interview>();

      const company = computed(() => interview.value?.company);
      const description = computed(() => interview.value?.vacancyLink);
      const name = computed(() => interview.value?.hrName);
      const telegram = computed(() => interview.value?.contactTelegram);
      const whatsApp = computed(() => interview.value?.contactWhatsApp);
      const phone = computed(() => interview.value?.contactPhone);
      const salaryFrom = computed(() => interview.value?.salaryFrom);
      const salaryTo = computed(() => interview.value?.salaryTo);
      const result = computed(() => interview.value?.result ?? "Unset");

      const stages = ref<Array<Stage> | undefined>(interview.value?.stages);

      function addStage() {
        stages.value = [...(stages.value || []), { name: "", date: null, description: "" }];
      }

      function deleteStage(index: number) {
        if (!stages.value) return;
        stages.value = stages.value.filter((_, i) => i !== index);
      }

      async function getInterview(): Promise<void> {
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          interview.value = docSnap.data() as Interview;
        }
      }

      return {
        getInterview,
        company,
        description,
        name,
        telegram,
        whatsApp,
        phone,
        salaryFrom,
        salaryTo,
        result,
        stages,
        addStage,
        deleteStage
      }
} 