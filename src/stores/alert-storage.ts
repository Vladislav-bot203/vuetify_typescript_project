import { defineStore } from "pinia"
import { ref } from "vue"

type AlertIcon = "mdi-alert-circle-outline" | "mdi-check-circle" | null

const useAlertStore = defineStore('alert', () => {
    const type = ref<string>('')
    const title = ref<string>('')
    const message = ref<string>('')
    const icon = ref<AlertIcon>(null)
    const isVisible = ref<boolean>(false)

    function setAlert (alertType: string, alertMessage: string, alertTitle: string): void {
        type.value = alertType;
        message.value = alertMessage;
        title.value = alertTitle;
        icon.value = alertType === 'warning' ? 'mdi-alert-circle-outline' : 'mdi-check-circle';
        isVisible.value = true;

        setTimeout(() => { clearAlert() }, 5000)
    }

    function clearAlert () {
        type.value = ''
        message.value = ''
        title.value = ''
        icon.value = null
        isVisible.value = false
    }

    return {
        type,
        message,
        icon,
        isVisible,
        title,
        setAlert
    }
})

export default useAlertStore