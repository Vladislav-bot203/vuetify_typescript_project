<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon="mdi-delete-outline"
        color="red-accent-3"
        v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card
      prepend-icon="mdi-help-circle"
      text="Are you sure you want to delete an interview? You wont't be able to restore the data."
      title="Delete an Interview?"
      class="bg-blue-grey-lighten-1"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog = false" class="bg-error"> Disagree </v-btn>

        <v-btn @click="confirm" class="bg-primary"> Agree </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useInterviewsStore from '../stores/interviews-storage';

const interviewStore = useInterviewsStore();
const props = defineProps(["id"]);
const dialog = ref<boolean>(false);

function confirm() {
    interviewStore.removeInterview(props.id);
}

</script>

<style scoped>
.v-btn--icon.v-btn--density-default {
  width: calc(var(--v-btn-height) + 4px);
  height: calc(var(--v-btn-height) + 4px);
}
</style>
