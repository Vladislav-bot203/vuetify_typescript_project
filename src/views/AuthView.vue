<template>
  <v-main class="ma-auto card-wrapper">
    <v-card
      class="mb-7 mt-10 bg-blue-grey-darken-3 rounded-lg mx-auto d-flex flex-column justify-center align-center pa-16 ga-2"
      :title="t('auth.title', formMode ? 0 : 1)"
    >
      <v-form
        @submit.prevent="submitForm"
        class="d-flex justify-center flex-column ga-5"
        ref="formRef"
      >
        <v-text-field
          variant="outlined"
          :label="t('auth.eMailInputLabel')"
          width="300"
          :rules="formMode ? [rules.email] : []"
          clearable
          autocomplete="username"
          v-model="mail"
          :placeholder="t('auth.eMailInputPlaceholder')"
        ></v-text-field>
        <v-text-field
          variant="outlined"
          :placeholder="t('auth.passwordInputPlaceholder')"
          :label="t('auth.passwordInputLabel')"
          :type="passwordInputIcon ? 'text' : 'password'"
          width="300"
          :rules="formMode ? [rules.counter, rules.minLen] : []"
          :append-inner-icon="passwordInputIcon ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="passwordInputIcon = !passwordInputIcon"
          autocomplete="username"
          v-model.trim="password"
        >
        </v-text-field>
        <v-text-field
          v-if="formMode"
          variant="outlined"
          :placeholder="t('auth.passwordConfirmInputPlaceholder')"
          :label="t('auth.passwordConfirmInputLabel')"
          :type="showPasswordConfirmationField ? 'text' : 'password'"
          width="300"
          :append-inner-icon="
            showPasswordConfirmationField ? 'mdi-eye' : 'mdi-eye-off'
          "
          @click:append-inner="
            showPasswordConfirmationField = !showPasswordConfirmationField
          "
          autocomplete="username"
          v-model="passwordConfirm"
          :rules="[rules.counter, rules.passwordConfirm, rules.minLen]"
        >
        </v-text-field>
        <v-btn type="submit" append-icon="mdi-login" color="green">{{
          t("auth.buttonText", formMode ? 0 : 1)
        }}</v-btn>
        <v-progress-linear
          color="deep-purple-accent-4"
          height="6"
          indeterminate
          rounded
          v-if="isLoading"
        ></v-progress-linear>
      </v-form>
      <span class="form-switcher" @click="switchFormMode">{{
        t("auth.title", formMode ? 1 : 0)
      }}</span>
    </v-card>
    <app-alert></app-alert>
  </v-main>
</template>

<script setup lang="ts">
import AppAlert from "../components/AppAlert.vue";
import useAuth from "../hooks/authorisation";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const authStore = useAuth();

const {
  formRef,
  switchFormMode,
  isLoading,
  passwordInputIcon,
  showPasswordConfirmationField,
  mail,
  formMode,
  password,
  passwordConfirm,
  submitForm,
} = authStore;

const rules = {
  counter: (value: string) =>
    !value || value.length <= 20 || "Max 20 characters",
  minLen: (value: string) => !value || value.length >= 8 || "Min 8 characters",
  passwordConfirm: (value: string) =>
    !value ||
    password.value === value ||
    "The password doesn't match the original",
  email: (value: string) => {
    if (!value) return true;
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
};
</script>

<style scoped>
.card-wrapper {
  width: 400px;
}

.form-switcher:hover {
  text-decoration: underline;
  cursor: pointer;
}

:deep(.v-text-field input:-webkit-autofill),
:deep(.v-text-field input:-webkit-autofill:hover),
:deep(.v-text-field input:-webkit-autofill:focus),
:deep(.v-text-field input:-webkit-autofill:active) {
  -webkit-box-shadow: 0 0 0 1000px #37474f inset !important;
  -webkit-text-fill-color: white !important;
  caret-color: white !important;
}
</style>
