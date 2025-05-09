<template>
  <v-main class="ma-auto">
    <v-card
      class="mb-7 mt-10 bg-blue-grey-darken-3 rounded-lg ma-auto d-flex flex-column justify-center align-center pa-16 ga-2"
      :title="title"
      width="400"
    >
      <v-form
        @submit.prevent="authStore.submitForm"
        class="d-flex justify-center flex-column ga-5"
        ref="form"
      >
        <v-text-field
          variant="outlined"
          label="User name"
          width="300"
          :rules="authStore.registration ? [rules.email] : []"
          clearable
          autocomplete="username"
          v-model="authStore.userName"
        ></v-text-field>
        <v-text-field
          variant="outlined"
          placeholder="Enter your password"
          label="Password"
          :type="authStore.showFirst ? 'text' : 'password'"
          width="300"
          :rules="authStore.registration ? [rules.counter, rules.minLen] : []"
          :append-inner-icon="authStore.showFirst ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="authStore.showFirst = !authStore.showFirst"
          autocomplete="username"
          v-model.trim="authStore.password"
        >
        </v-text-field>
        <v-text-field
          v-if="authStore.registration"
          variant="outlined"
          placeholder="Confirm your password"
          label="Confirm your password"
          :type="authStore.showSecond ? 'text' : 'password'"
          width="300"
          :append-inner-icon="authStore.showSecond ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="authStore.showSecond = !authStore.showSecond"
          autocomplete="username"
          v-model="authStore.passwordConfirm"
          :rules="[rules.counter, rules.passwordConfirm, rules.minLen]"
        >
        </v-text-field>
        <v-btn type="submit" append-icon="mdi-login" color="green">{{
          buttonText
        }}</v-btn>
        <v-progress-linear
          color="deep-purple-accent-4"
          height="6"
          indeterminate
          rounded
          v-if="loading"
        ></v-progress-linear>
      </v-form>
      <span class="account-creation" @click="changeForm">{{ linkText }}</span>
    </v-card>
    <app-alert></app-alert>
  </v-main>
</template>

<script setup lang="ts">
import AppAlert from "../components/AppAlert.vue";
import useAuthStore from "../stores/auth-storage";
import { computed, ref } from "vue";

const authStore = useAuthStore();

const form = ref();
const buttonText = computed<string>(() => authStore.buttonText);
const title = computed<string>(() => authStore.title);
const linkText = computed<string>(() => authStore.linkText);
const loading = computed<boolean>(() => authStore.isLoading);

function changeForm(): void {
  authStore.changeForm(form);
}

const rules = {
  counter: (value: string) =>
    !value || value.length <= 20 || "Max 20 characters",
  minLen: (value: string) => !value || value.length >= 8 || "Min 8 characters",
  passwordConfirm: () =>
    !authStore.passwordConfirm ||
    authStore.password === authStore.passwordConfirm ||
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
.account-creation:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
