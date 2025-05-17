<template>
  <div
    class="pl-14 w-100 d-flex align-start justify-center pb-10 flex-sm-wrap"
    min-height="100vh"
  >
    <v-card class="w-75 h-100 bg-blue-grey-darken-3 mt-16" min-width="350">
      <slot name="title"></slot>
      <slot name="body"></slot>
      <app-alert class="w-75"></app-alert>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import AppAlert from "./AppAlert.vue";
</script>
