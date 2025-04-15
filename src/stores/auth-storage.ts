import { defineStore } from "pinia";
import { ref } from "vue";
import useAlertStore from "./alert-storage";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useUserStore from "./user-storage";

const useAuthStore = defineStore("auth", () => {
  const showFirst = ref<boolean>(false);
  const showSecond = ref<boolean>(false);
  const registration = ref<boolean>(false);
  const userName = ref<string>("")
  const password = ref<string>("");
  const passwordConfirm = ref<string>("");
  const isLoading = ref<boolean>(false);
  const userStore = useUserStore();
  const router = useRouter();

  const alertStore = useAlertStore()

  async function submitForm (): Promise<void> {
    if (!isLoading.value) {
      if (!userName.value) {
        alertStore.setAlert('warning', 'You should input the correct username!', 'Error');
      } else if (!password.value || password.value.length < 8 || password.value.length > 20 || passwordConfirm.value != password.value) {
        alertStore.setAlert('warning', 'You should input the correct password!', 'Error');
      } else {
        if (registration.value) {
          await signUp();
        } else {
          await signIn();
        }
      }
      clearForm()
    }
  }

  async function signUp (): Promise<void> {
    isLoading.value = true;
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userName.value, password.value);
      clearForm()
      router.push('/')
    } catch (e: unknown) {
      if (e instanceof Error) {
        alertStore.setAlert('warning', e.message, e.name)
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function signIn (): Promise<void> {
    isLoading.value = true;
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, userName.value, password.value);
      clearForm()
      router.push({ name: 'Home' })
    } catch (e: unknown) {
      if (e instanceof Error) {
        alertStore.setAlert('warning', e.message, e.name)
      }
    } finally {
      isLoading.value = false;
    }
  }

  const signOutMethod = async (): Promise<void> => {
    await signOut(getAuth());
    router.push('/auth');
    userStore.userId = '';
    router.push({ name: 'Auth' })
  }

  function changeForm () {
    registration.value = !registration.value
  }

  function clearForm () {
    password.value = ''
    passwordConfirm.value = ''
    userName.value = ''
  }


  return {
    submitForm,
    changeForm,
    signOutMethod,
    userName,
    password,
    passwordConfirm,
    showFirst,
    showSecond,
    registration,
  };
});

export default useAuthStore;
