import { defineStore } from "pinia";
import { ref } from "vue";

type AlertIcon = false | "mdi-alert-circle-outline" | "mdi-check-circle" | undefined;
type AlertType = "success" | "warning" | "error" | "info";

const useAlertStore = defineStore("alert", () => {
  const type = ref<AlertType>("info");
  const title = ref<string>("");
  const message = ref<string>("");
  const icon = ref<AlertIcon>();

  function setAlert(
    alertType: AlertType,
    alertMessage: string,
    alertTitle: string
  ): void {
    type.value = alertType;
    message.value = alertMessage;
    title.value = alertTitle;
    icon.value =
      alertType === "warning" ? "mdi-alert-circle-outline" : "mdi-check-circle";

    setTimeout(() => {
      clearAlert();
    }, 5000);
  }

  function clearAlert() {
    type.value = "info";
    message.value = "";
    title.value = "";
    icon.value = undefined;
  }

  return {
    type,
    message,
    icon,
    title,
    setAlert,
  };
});

export default useAlertStore;
