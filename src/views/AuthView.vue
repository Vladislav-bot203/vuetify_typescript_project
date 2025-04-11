<template>
    <v-main class="ma-auto">
        <v-card class="mb-7 mt-10 bg-blue-grey-darken-3 rounded-lg ma-auto d-flex flex-column justify-center align-center pa-16 ga-2" :title="authStore.title" width="400">
        <v-form @submit.prevent="" class="d-flex justify-center flex-column ga-5">
          <v-text-field 
            variant="outlined" 
            label="User name" 
            width="300" 
            clearable
            autocomplete="username"
          ></v-text-field>
          <v-text-field 
            variant="outlined" 
            placeholder="Enter your password" 
            label="Password"
            :type="authStore.showFirst ? 'text' : 'password'" 
            width="300" 
            :append-inner-icon="authStore.showFirst? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="authStore.showFirst = !authStore.showFirst"
            autocomplete="username"
          >
          </v-text-field>
          <v-text-field
            v-if="authStore.registration" 
            variant="outlined" 
            placeholder="Confirm your password" 
            label="Confirm your password"
            :type="authStore.showSecond ? 'text' : 'password'" 
            width="300" 
            :append-inner-icon="authStore.showSecond? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="authStore.showSecond = !authStore.showSecond"
            autocomplete="username"
          >
          </v-text-field>
          <v-btn type="submit" append-icon="mdi-login" color="green">{{ authStore.buttonText }}</v-btn>
        </v-form>
        <span class="account-creation" @click="authStore.changeForm">{{ authStore.linkText }}</span>
      </v-card>
      <app-alert></app-alert>
    </v-main>
  </template>
  
  <script setup lang="ts">
  import AppAlert from '../components/ui/AppAlert.vue'
  import useAuthStore from '../stores/auth-storage'
  
  const authStore = useAuthStore()

  </script>
  
  <style scoped>
  .account-creation:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  </style>
  