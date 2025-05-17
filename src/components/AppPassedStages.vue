<template>
  <v-container class="pa-0 d-flex ga-4 justify-center">
    <template v-if="props.stages && props.stages.length">
      <v-tooltip
        v-for="(stage, i) in props.stages"
        :key="i"
        :text="stage.name"
        location="top"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-avatar v-bind="activatorProps" color="yellow-darken-4" size="20">
            {{ i + 1 }}
          </v-avatar>
        </template>
      </v-tooltip>
    </template>

    <v-tooltip v-else text="No stages added" location="top">
      <template v-slot:activator="{ props: activatorProps }">
        <v-avatar v-bind="activatorProps" color="yellow-darken-4" size="20"
          >-</v-avatar
        >
      </template>
    </v-tooltip>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps(["stages"]);
</script>
