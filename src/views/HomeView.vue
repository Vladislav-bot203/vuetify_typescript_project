<template>
  <app-page>
    <template #title>
      <v-card-title>Create new interview</v-card-title>
    </template>
    <template #body>
      <v-card-item>
        <v-form
          class="bg-blue-grey-darken-2 d-flex flex-column ga-2 pa-10 rounded-lg"
          @submit.prevent="sendData"
          ref="form"
        >
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            label="Company *"
            v-model="company"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            label="Company description link *"
            v-model="description"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            label="Contacts name *"
            v-model="name"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            label="Telegram username of HR"
            v-model="telegram"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            label="WhatsApp username of HR"
            v-model="whatsapp"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            label="Phonenumber of HR"
            v-model="phonenumber"
          ></v-text-field>
          <v-btn
            type="submit"
            text="Create"
            color="primary w-50 align-self-center"
            :disabled="disabledSubmitButton"
          ></v-btn>
          <v-progress-linear
            color="deep-purple-accent-4"
            height="6"
            indeterminate
            rounded
            v-if="isLoading"
          ></v-progress-linear>
        </v-form>
      </v-card-item>
    </template>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "../components/ui/AppPage.vue";
import useCreateInterview from "../hooks/createInterview";

const createInterview = useCreateInterview();

const {
  company,
  description,
  name,
  telegram,
  whatsapp,
  phonenumber,
  sendData,
  form,
  disabledSubmitButton,
  isLoading
} = createInterview;
</script>
