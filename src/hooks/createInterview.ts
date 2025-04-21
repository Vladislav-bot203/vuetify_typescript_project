import { ref } from "vue";

export default function useCreateInterview () {
const company = ref<string>('');
const description = ref<string>('');
const name = ref<string>('');
const telegram = ref<string>('');
const whatsapp = ref<string>('');
const phonenumber = ref<string>('');

function clearData() {
    company.value = '';
    description.value = '';
    name.value = '';
    telegram.value = '';
    whatsapp.value = '';
    phonenumber.value = '';
}

function sendData() {
    clearData();
}

return {
    company,
    description,
    name,
    telegram,
    whatsapp,
    phonenumber,
    sendData
}
}