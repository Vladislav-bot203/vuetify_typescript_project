<template>
  <app-page>
    <template #title>
      <v-card-title>{{ t("page.title[0]") }}</v-card-title>
    </template>
    <template #body>
      <v-card-item>
        <v-form
          class="bg-blue-grey-darken-2 d-flex flex-column ga-10 pa-10 rounded-lg"
          @submit.prevent="sendData"
          ref="formRef"
        >
          <v-container class="pa-0">
            <v-text-field
              autocomplete="off"
              clearable
              variant="outlined"
              :label="t('home.companyInput')"
              v-model="form.company"
            ></v-text-field>
            <app-validation-error
              :errors="errors?.company"
            ></app-validation-error>
          </v-container>
          <v-container class="pa-0">
            <v-text-field
              autocomplete="off"
              clearable
              variant="outlined"
              :label="t('home.descriptionLinkInput')"
              v-model="form.description"
            ></v-text-field>
            <app-validation-error
              :errors="errors?.description"
            ></app-validation-error>
          </v-container>
          <v-container class="pa-0">
            <v-text-field
              autocomplete="off"
              clearable
              variant="outlined"
              :label="t('home.contactsNameInput')"
              v-model="form.name"
            ></v-text-field>
            <app-validation-error :errors="errors?.name"></app-validation-error>
          </v-container>
          <v-container class="pa-0">
            <v-text-field
              autocomplete="off"
              clearable
              variant="outlined"
              :label="t('home.telegramInput')"
              v-model="form.telegram"
            ></v-text-field>
            <app-validation-error
              :errors="errors?.telegram"
            ></app-validation-error>
          </v-container>
          <v-container class="pa-0">
            <v-text-field
              autocomplete="off"
              clearable
              variant="outlined"
              :label="t('home.whatsAppInput')"
              v-model="form.whatsApp"
            ></v-text-field>
            <app-validation-error
              :errors="errors?.whatsApp"
            ></app-validation-error>
          </v-container>
          <v-container class="pa-0">
            <v-text-field
              autocomplete="off"
              clearable
              variant="outlined"
              :label="t('home.phoneInput')"
              v-model="form.phoneNumber"
            ></v-text-field>
            <app-validation-error
              :errors="errors?.phoneNumber"
            ></app-validation-error>
          </v-container>
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
import AppValidationError from "../components/AppValidationError.vue";
import useCreateInterview from "../hooks/createInterview";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const createInterview = useCreateInterview();

const { sendData, formRef, submitButtonActivity, isLoading, form, errors } =
  createInterview;
</script>
