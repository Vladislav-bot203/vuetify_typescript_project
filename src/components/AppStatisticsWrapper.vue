<template>
  <v-chart v-bind="$attrs" autoresize />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import VChart from "vue-echarts";

onMounted(() => {
  const handler = (e: Event) => {
    if (e.type === "mousewheel" || e.type === "wheel") {
      e.preventDefault();
    }
  };

  window.addEventListener("mousewheel", handler, { passive: false });
  window.addEventListener("wheel", handler, { passive: false });

  return () => {
    window.removeEventListener("mousewheel", handler);
    window.removeEventListener("wheel", handler);
  };
});
</script>
