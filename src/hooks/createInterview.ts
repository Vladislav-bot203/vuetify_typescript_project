import { ref, computed, reactive } from "vue";
import { type Interview } from "../stores/interviews-storage";
import { v4 as uuidv4 } from "uuid";
import useUserStore from "../stores/user-storage";
import { useRouter } from "vue-router";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import useAlertStore from "../stores/alert-storage";
import { signOut, getAuth } from "firebase/auth";
import * as z from "zod";

const formSchema = z.object({
  company: z
    .string()
    .min(3, { message: "Needs to be at least 3 characters long" })
    .max(50, { message: "Needs to be not longer than 50 characters" })
    .nonempty(),
  description: z.string().nonempty(),
  name: z
    .string()
    .min(5)
    .nonempty()
    .min(3, { message: "Needs to be at least 3 characters long" }),
  telegram: z.string().optional().or(z.literal("")),
  whatsApp: z.string().optional().or(z.literal("")),
  phoneNumber: z
    .string()
    .min(10, { message: "The minimum phone number length is 10 characters" })
    .max(15, { message: "The maximum phone number length is 15 characters" })
    .regex(/^[+\d][\d\s\-()]*$/, {
      message:
        "The phone number must include only spaces, numbers, '-', '(', ')' or '+' in the beginning",
    })
    .optional()
    .or(z.literal(""))
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function useCreateInterview() {
  const errors = ref<z.ZodFormattedError<FormSchemaType> | null>(null);
  const form = reactive<FormSchemaType>({
    company: "",
    description: "",
    name: "",
    telegram: "",
    whatsApp: "",
    phoneNumber: "",
  });

  const formRef = ref();
  const isLoading = ref<boolean>(false);
  const userStore = useUserStore();
  const router = useRouter();
  const db = getFirestore();
  const alertStore = useAlertStore();

  const submitButtonActivity = computed<boolean>(
    () => !(form.company && form.description && form.name)
  );

  async function logout(): Promise<void> {
    await signOut(getAuth());
    userStore.userId = "";
    await router.push({ name: "Auth" });
  }

  async function sendData(): Promise<void> {
    isLoading.value = true;

    const validSchema = formSchema.safeParse(form);

    if (!validSchema.success) {
      errors.value = validSchema.error.format();
      isLoading.value = false;
      setTimeout(() => {
        errors.value = null;
        customReset();
      }, 4000)
      return;
    } else {
      errors.value = null;
    }

    const payload: Interview = {
      company: form.company,
      vacancyLink: form.description,
      hrName: form.name,
      contactTelegram: form.telegram,
      contactPhone: form.phoneNumber,
      contactWhatsApp: form.whatsApp,
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
          router.push({ name: "Interviews" });
        });
      } catch (error) {
        if (error instanceof Error) {
          alertStore.setAlert("warning", error.message, error.name);
        }
      }
    } else {
      try {
        await logout();
      } catch (error) {
        if (error instanceof Error) {
          alertStore.setAlert("warning", error.message, error.name);
        }
      }
    }

    isLoading.value = false;
    customReset();
  }

  function customReset() {
    form.company = "";
    form.description = "";
    form.name = "";
    form.phoneNumber = "";
    form.telegram = "";
    form.whatsApp = "";
  }

  return {
    sendData,
    formRef,
    submitButtonActivity,
    isLoading,
    form,
    errors,
  };
}
