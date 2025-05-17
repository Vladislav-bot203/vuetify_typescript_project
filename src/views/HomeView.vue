<template>
  <app-page>
    <template #title>
      <v-card-title>{{ t("page.title", 0) }}</v-card-title>
    </template>
    <template #body>
      <v-card-item>
        <v-form
          class="bg-blue-grey-darken-2 d-flex flex-column ga-2 pa-10 rounded-lg"
          @submit.prevent="sendData"
          ref="formRef"
        >
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            :label="t('home.companyInput')"
            v-model="company"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            :label="t('home.descriptionLinkInput')"
            v-model="description"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            :label="t('home.contactsNameInput')"
            v-model="name"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            :label="t('home.telegramInput')"
            v-model="telegram"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            :label="t('home.whatsAppInput')"
            v-model="whatsapp"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            clearable
            variant="outlined"
            :label="t('home.phoneInput')"
            v-model="phonenumber"
          ></v-text-field>
          <v-btn
            type="submit"
            :text="t('home.buttonText')"
            class="bg-primary w-50 align-self-center"
            :disabled="submitButtonActivity"
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
import AppPage from "../components/AppPage.vue";
import useCreateInterview from "../hooks/createInterview";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const createInterview = useCreateInterview();

const {
  company,
  description,
  name,
  telegram,
  whatsapp,
  phonenumber,
  sendData,
  formRef,
  submitButtonActivity,
  isLoading,
} = createInterview;
</script>
