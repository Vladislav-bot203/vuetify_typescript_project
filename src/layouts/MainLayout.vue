<template>
  <v-app class="bg-blue-grey-darken-4 d-flex align-center">
    <the-nav-bar></the-nav-bar>
    <router-view></router-view>
  </v-app>
</template>

<script setup lang="ts">
import TheNavBar from "../components/TheNavBar.vue";
</script>
