<template>
  <component :is="layoutMap[layout]" v-if="layout"></component>
</template>

<script setup lang="ts">
import MainLayout from "./layouts/MainLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

type LayoutMap = {
  Main: typeof MainLayout;
  Auth: typeof AuthLayout;
};

const layoutMap: LayoutMap = {
  Main: MainLayout,
  Auth: AuthLayout,
};

const layout = computed(() => route.meta.layout as keyof LayoutMap);
</script>

<style scoped></style>
