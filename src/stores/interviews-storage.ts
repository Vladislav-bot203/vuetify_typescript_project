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

export interface InterviewsStats {
  value: number,
  name: string
}

const useInterviewsStore = defineStore("interviews", () => {
  const interviews = ref<Array<Interview>>();

  function removeInterview(id: string) {
    interviews.value = interviews.value?.filter(
      (interview: Interview): boolean => interview.id !== id
    );
  }

  function getInterviewsStats () {
    if (!interviews.value) return [];

    const statsMap = interviews.value.reduce((acc: Record<string, number>, interview: Interview) => {
      const result = interview.result || "Unset";
      acc[result] = (acc[result] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statsMap).map(([name, value]) => ({
      name,
      value
    }));
  }

  return {
    interviews,
    removeInterview,
    getInterviewsStats
  };
});

export default useInterviewsStore;
