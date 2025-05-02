import { defineStore } from "pinia";
import { ref } from "vue";

export interface Stage {
  name: string;
  date: Date | null;
  description: string;
}

export interface Interview {
  id: string;
  company: string;
  vacancyLink: string;
  hrName: string;
  contactTelegram?: string;
  contactWhatsApp?: string;
  contactPhone?: string;
  createdAt: Date;
  salaryFrom?: number;
  salaryTo?: number;
  stages?: Stage[];
  result?: "Refusal" | "Offer" | "Unset";
}

const useInterviewsStore = defineStore("interviews", () => {
  const interviews = ref<Array<Interview>>();

  function removeInterview(id: string) {
    interviews.value = interviews.value?.filter(
      (interview: Interview): boolean => interview.id !== id
    );
  }

  return {
    interviews,
    removeInterview
  };
});

export default useInterviewsStore;
