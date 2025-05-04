import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { useRoute } from "vue-router";
import useUserStore from "../stores/user-storage";
import type { Interview, Stage } from "../stores/interviews-storage";
import { ref } from "vue";
import useAlertStore from "../stores/alert-storage";

export default function useEditInterview() {
  const route = useRoute();
  const db = getFirestore();
  const userStore = useUserStore();
  const alertStore = useAlertStore();
  const isSending = ref<boolean>(false);
  const isFetchingData = ref<boolean>(false);
  const docRef = doc(
    db,
    `users/${userStore.userId}/interviews`,
    route.params.id as string
  );

  const interview = ref<Interview>();

  const company = ref<string>("");
  const description = ref<string>("");
  const name = ref<string>("");
  const telegram = ref<string>("");
  const whatsApp = ref<string>("");
  const phone = ref<string>("");
  const salaryFrom = ref<number>();
  const salaryTo = ref<number>();
  const result = ref<"Offer" | "Refusal" | "Unset">("Unset");

  const stages = ref<Array<Stage> | []>([]);

  function addStage() {
    stages.value = [
      ...(stages.value || []),
      { name: "", date: null, description: "" },
    ];
  }

  function deleteStage(index: number) {
    if (!stages.value) return;
    stages.value = stages.value.filter((_, i) => i !== index);
  }

  async function getInterview(): Promise<void> {
    isFetchingData.value = true;
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        interview.value = docSnap.data() as Interview;
        company.value = interview.value.company;
        description.value = interview.value.vacancyLink;
        name.value = interview.value.hrName;
        telegram.value = interview.value.contactTelegram ?? "";
        whatsApp.value = interview.value.contactWhatsApp ?? "";
        phone.value = interview.value.contactPhone ?? "";
        salaryFrom.value = interview.value.salaryFrom ?? 0;
        salaryTo.value = interview.value.salaryTo ?? 0;
        result.value = interview.value.result ?? result.value;
        if (interview.value.stages && interview.value.stages.length) {
          stages.value = interview.value.stages.map((stage: Stage) => ({
            ...stage,
            date:
              stage.date instanceof Timestamp
                ? stage.date.toDate()
                : stage.date,
          }));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alertStore.setAlert(
          "error",
          "Failed to get the interview's info",
          "Error"
        );
      }
    }
    isFetchingData.value = false;
  }

  async function saveChanges() {
    isSending.value = true;
    if (interview.value?.id) {
      const updatedData: Interview = {
        id: interview.value.id,
        company: company.value,
        vacancyLink: description.value,
        hrName: name.value,
        contactTelegram: telegram.value,
        contactWhatsApp: whatsApp.value,
        contactPhone: phone.value,
        salaryFrom: salaryFrom.value,
        salaryTo: salaryTo.value,
        stages: stages.value,
        result: result.value,
        createdAt: interview.value.createdAt,
      };

      try {
        await updateDoc(docRef, { ...updatedData });
      } catch (error) {
        if (error instanceof Error) {
          alertStore.setAlert(
            "error",
            "Failed to save the interview's changes",
            "Error"
          );
        }
      }
    }
    isSending.value = false;
  }

  function updateStage(id: number, updatedStage: Stage) {
    if (stages.value) {
      stages.value[id] = updatedStage;
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
    deleteStage,
    updateStage,
    saveChanges,
    isSending,
    isFetchingData
  };
}
