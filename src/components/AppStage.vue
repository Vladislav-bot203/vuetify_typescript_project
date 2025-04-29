<template>
  <v-container
    class="pa-3 bg-blue-grey-darken-1 d-flex flex-column align-center mb-5 rounded-lg"
    min-width="350"
    style="border: 2px solid #2979ff"
  >
    <v-text-field
      autocomplete="off"
      variant="outlined"
      label="Stage Name"
      width="100%"
      :model-value="stage.name"
    ></v-text-field>
    <v-date-picker
      title="Interview date"
      color="red-lighten-1"
      theme="dark"
      bg-color="blue-grey-darken-2"
      header-color="blue-grey-darken-3"
      min-width="350"
      :model-value="stage.date"
    >
    </v-date-picker>
    <v-textarea
      clearable
      label="Comments"
      variant="solo-filled"
      class="mt-6"
      width="90%"
      bg-color="blue-grey-darken-2"
      no-resize
      :model-value="stage.description"
    ></v-textarea>
    <v-btn color="red-accent-3" icon="mdi-trash-can-outline" @click="handleRemove"></v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { Stage } from '../stores/interviews-storage';

const emit = defineEmits(['remove'])

const { stage } = defineProps<{
    stage: Stage
}>()

function handleRemove() {
    emit('remove');
}
</script>
