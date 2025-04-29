import { defineStore } from "pinia";
import { ref } from "vue";

export interface Stage {
    name: string
    date: Date | null
    description: string
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

  return {
    interviews
  };
});

export default useInterviewsStore;
