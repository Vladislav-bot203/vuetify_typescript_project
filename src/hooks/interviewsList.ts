import {
  query,
  collection,
  orderBy,
  getDocs,
  getFirestore,
  deleteDoc,
  doc
} from "firebase/firestore";
import type { Interview } from "../stores/interviews-storage";
import useInterviewsStore from "../stores/interviews-storage";
import useUserStore from "../stores/user-storage";
import { ref } from "vue";
import useAlertStore from "../stores/alert-storage";

interface TableHeader {
  readonly title: string;
  readonly key: string;
  readonly sortable: boolean;
  readonly align?: "center" | "start" | "end" | undefined;
}

export default function useInterviewsList() {
  const interviewsStore = useInterviewsStore();
  const userStore = useUserStore();
  const db = getFirestore();
  const search = ref<string>('');
  const alertStore = useAlertStore();
  const isFetchingData = ref<boolean>(false);
  const headers = ref<Array<TableHeader>>([
    {
      title: "Company",
      key: "company",
      sortable: true,
    },
    {
      title: "HR Name",
      key: "hrName",
      sortable: false,
      align: "center",
    },
    {
      title: "Vacancy",
      key: "vacancyLink",
      sortable: false,
      align: "center",
    },
    {
      title: "Contacts",
      key: "contactTelegram",
      sortable: false,
      align: "center",
    },
    {
      title: "Passed stages",
      key: "stages",
      sortable: false,
      align: "center",
    },
    {
      title: "Salary",
      key: "salaryFrom",
      sortable: false,
      align: "center",
    },
    {
      title: "Result",
      key: "result",
      sortable: false,
      align: "center",
    },
    {
      title: "Actions",
      key: "id",
      sortable: false,
      align: "center",
    },
  ]);

  async function getAllInteviews(): Promise<void> {
    isFetchingData.value = true;
    const getData = query(
      collection(db, `users/${userStore.userId}/interviews`),
      orderBy("createdAt", "desc")
    );
    try {
      const listDocs = await getDocs(getData);
      interviewsStore.interviews = listDocs.docs.map(
      (doc) => doc.data() as Interview
      );
    } catch (error) {
      if (error instanceof Error) {
        alertStore.setAlert('error', "Failed to fetch data", "Error");
      }
    }
    isFetchingData.value = false;
  }

  async function deleteInterview(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, `users/${userStore.userId}/interviews`, id));
      interviewsStore.removeInterview(id);
    } catch (error) {
      if (error instanceof Error) {
        alertStore.setAlert('error', "Failed to delete an interview", "Error");
      }
    }
  }

  return {
    getAllInteviews,
    headers,
    deleteInterview,
    search,
    isFetchingData
  };
}
