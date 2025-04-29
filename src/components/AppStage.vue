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
      v-model="props.stage.name"
    ></v-text-field>
    <v-date-picker
      title="Interview date"
      color="red-lighten-1"
      theme="dark"
      bg-color="blue-grey-darken-2"
      header-color="blue-grey-darken-3"
      min-width="350"
      v-model="props.stage.date"
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
      v-model="props.stage.description"
    ></v-textarea>
    <v-btn
      color="red-accent-3"
      icon="mdi-trash-can-outline"
      @click="handleRemove"
    ></v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import { defineProps, watch, defineEmits } from "vue";

const props = defineProps(["stage"]);
const emits = defineEmits(["update:stage", "remove"]);

watch(props.stage, (newVal) => {
  emits("update:stage", newVal);
});

function handleRemove() {
  emits("remove");
}
</script>
