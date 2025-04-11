import { defineStore } from "pinia";
import { ref } from "vue";
import useAlertStore from "./alert-storage";

type FormValue = 'LogIn' | 'Create an account'

const useAuthStore = defineStore("auth", () => {
  const showFirst = ref<boolean>(false);
  const showSecond = ref<boolean>(false);
  const registration = ref<boolean>(false);
  const title = ref<FormValue>("LogIn");
  const linkText = ref<FormValue>("Create an account");
  const buttonText = ref<string>("LogIn");
  const userName = ref<string>("")
  const password = ref<string>("");
  const passwordConfirm = ref<string>("");

  const alertStore = useAlertStore()

  const changeForm = (): void => {
    registration.value = !registration.value;
    if (title.value === "LogIn") {
      title.value = "Create an account";
      buttonText.value = "Create";
      linkText.value = "LogIn";
    } else {
      title.value = "LogIn";
      buttonText.value = "LogIn";
      linkText.value = "Create an account";
    }
    clearForm()
  }

  async function submitForm (): Promise<void> {
    if (!password.value) {
      alertStore.setAlert('warning', 'You should input the password!', 'Error')
    } else if (!userName.value) {
      alertStore.setAlert('warning', 'You should input the username!', 'Error')
    } else {
      if (registration) {

      } else {
  
      }
    }
    clearForm()
  }

  function clearForm () {
    password.value = ''
    passwordConfirm.value = ''
    userName.value = ''
  }


  return {
    submitForm,
    userName,
    password,
    passwordConfirm,
    showFirst,
    showSecond,
    registration,
    title,
    linkText,
    buttonText,
    changeForm
  };
});

export default useAuthStore;
