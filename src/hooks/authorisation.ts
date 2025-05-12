import { ref } from "vue";
import useAlertStore from "../stores/alert-storage";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import useUserStore from "../stores/user-storage";

type FormValue = "LogIn" | "Create an account";

export default function useAuth() {
  const formRef = ref();
  const title = ref<FormValue>("LogIn");
  const formButtonText = ref<FormValue>("Create an account");
  const buttonText = ref<string>("LogIn");

  const passwordInputIcon = ref<boolean>(false);
  const showPasswordConfirmationField = ref<boolean>(false);
  const formMode = ref<boolean>(false);
  const mail = ref<string>("");
  const password = ref<string>("");
  const passwordConfirm = ref<string>("");
  const isLoading = ref<boolean>(false);
  const userStore = useUserStore();
  const router = useRouter();

  const alertStore = useAlertStore();

  async function submitForm(): Promise<void> {
    if (!isLoading.value) {
      if (!mail.value) {
        alertStore.setAlert(
          "warning",
          "You should input the correct username!",
          "Error"
        );
      } else if (
        !password.value ||
        password.value.length < 8 ||
        password.value.length > 20 ||
        (passwordConfirm.value != password.value && formMode.value)
      ) {
        alertStore.setAlert(
          "warning",
          "You should input the correct password!",
          "Error"
        );
      } else {
        if (formMode.value) {
          await signUp();
        } else {
          await signIn();
        }
      }
    }
  }

  async function signUp(): Promise<void> {
    isLoading.value = true;
    try {
      const auth = getAuth();
      const response = await createUserWithEmailAndPassword(
        auth,
        mail.value,
        password.value
      );

      userStore.userId = response.user.uid;
      await router.push({ name: "Home" });

      clearForm();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alertStore.setAlert("warning", e.message, e.name);
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function signIn(): Promise<void> {
    isLoading.value = true;
    try {
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(
        auth,
        mail.value,
        password.value
      );

      userStore.userId = response.user.uid;
      await router.push({ name: "Home" });

      clearForm();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alertStore.setAlert("warning", e.message, e.name);
      }
    } finally {
      isLoading.value = false;
    }
  }

  const signOutMethod = async (): Promise<void> => {
    await signOut(getAuth());
    router.push("/auth");
    userStore.userId = "";
    router.push({ name: "Auth" });
  };

  function switchFormMode() {
    formMode.value = !formMode.value;
    if (title.value === "LogIn") {
      title.value = "Create an account";
      buttonText.value = "Create";
      formButtonText.value = "LogIn";
    } else {
      title.value = "LogIn";
      buttonText.value = "LogIn";
      formButtonText.value = "Create an account";
    }
    formRef.value?.reset();
    formRef.value?.resetValidation();
  }

  function clearForm() {
    password.value = "";
    passwordConfirm.value = "";
    mail.value = "";
  }

  return {
    submitForm,
    switchFormMode,
    signOutMethod,
    mail,
    password,
    passwordConfirm,
    passwordInputIcon,
    showPasswordConfirmationField,
    formMode,
    buttonText,
    title,
    formButtonText,
    isLoading,
    formRef,
  };
}
