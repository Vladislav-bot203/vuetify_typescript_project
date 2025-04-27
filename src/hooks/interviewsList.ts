import {
  query,
  collection,
  orderBy,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import type { Interview } from "../stores/interviews-storage";
import useInterviewsStore from "../stores/interviews-storage";
import useUserStore from "../stores/user-storage";
import { ref } from "vue";

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
    const getData = query(
      collection(db, `users/${userStore.userId}/interviews`),
      orderBy("createdAt", "desc")
    );

    const listDocs = await getDocs(getData);
    interviewsStore.interviews = listDocs.docs.map(
      (doc) => doc.data() as Interview
    );
  };

  async function deleteInterview(): Promise<void> {

  }

  return {
    getAllInteviews,
    headers,
    deleteInterview
  };
}
