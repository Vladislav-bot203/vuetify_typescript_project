import { ref, computed } from "vue";
import { type Interview } from "../stores/interviews-storage";
import { v4 as uuidv4 } from "uuid";
import useUserStore from "../stores/user-storage";
import { useRouter } from "vue-router";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import useAlertStore from "../stores/alert-storage";

export default function useCreateInterview() {
  const company = ref<string>("");
  const description = ref<string>("");
  const name = ref<string>("");
  const telegram = ref<string>("");
  const whatsapp = ref<string>("");
  const phonenumber = ref<string>("");
  const form = ref();
  const isLoading = ref<boolean>(false);
  const userStore = useUserStore();
  const router = useRouter();
  const db = getFirestore();
  const alertStore = useAlertStore();

  const disabledSubmitButton = computed<boolean>(
    () => !(company.value && description.value && name.value)
  );

  async function sendData(): Promise<void> {
    isLoading.value = true;
    const payload: Interview = {
      company: company.value,
      vacancyLink: description.value,
      hrName: name.value,
      contactTelegram: telegram.value,
      contactPhone: phonenumber.value,
      contactWhatsApp: whatsapp.value,
      createdAt: new Date(),
      id: uuidv4(),
    };

    const userId = userStore.userId;

    if (userId) {
      try {
        await setDoc(
          doc(db, `users/${userId}/interviews`, payload.id),
          payload
        ).then(() => {
          router.push({ name: 'Interviews' });
        });
      } catch (error) {
        if (error instanceof Error) {
          alertStore.setAlert("warning", error.message, error.name);
        }
      }
    }

    isLoading.value = false;
    form.value?.reset();
  }

  return {
    company,
    description,
    name,
    telegram,
    whatsapp,
    phonenumber,
    sendData,
    form,
    disabledSubmitButton,
    isLoading,
  };
}
