<template>
  <app-page>
    <template #title>
      <v-card-title>Editing Interview</v-card-title>
    </template>

    <template #body>
      <v-form 
        class="bg-blue-grey-darken-2 d-flex flex-column rounded-lg align-center">
        <v-container 
          class="rounded-lg bg-blue-grey-darken-1 ma-8"
          min-width="350"
          style="border: 2px solid #2979FF;"
        >
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Company"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Description link"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="HR Name"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Telegram"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="WhatsApp"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Phone Number"
          ></v-text-field>
          <v-container 
            class="d-flex justify-space-between pa-0 ga-4"
            min-width="350"
          >
            <v-text-field
              variant="outlined"
              autocomplete="off"
              label="Salary From"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              autocomplete="off"
              label="Salary To"
            ></v-text-field>
          </v-container>
          <v-btn
            prepend-icon="mdi-plus"
            text="Add new stage"
            color="primary"
          ></v-btn>
        </v-container>

        <v-container 
          class="pa-3 bg-blue-grey-darken-1 d-flex flex-column align-center mb-5 rounded-lg"
          min-width="350"
          style="border: 2px solid #2979FF;"
        >
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Stage Name"
            width="100%"
          ></v-text-field>
          <v-date-picker 
            title="Interview date" 
            color="red-lighten-1"
            theme="dark"
            bg-color="blue-grey-darken-2"
            header-color="blue-grey-darken-3"
            :model-value="a"
            min-width="350"
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
          ></v-textarea>
          <v-btn color="red-accent-3" icon="mdi-trash-can-outline"></v-btn>
        </v-container>
        <v-container
          class="pa-3 bg-blue-grey-darken-1 d-flex justify-center align-center rounded-lg mb-6"
          min-width="350"
          style="border: 2px solid #2979FF;"
        >
          <v-radio-group inline class="d-flex justify-center">
            <v-radio value="Offer" label="Offer" color="success"></v-radio>
            <v-radio value="Refusal" label="Refusal" color="error"></v-radio>
            <v-radio value="Unset" label="Unset" color="primary"></v-radio>
          </v-radio-group>
        </v-container>
        <v-btn text="Confirm" class="mb-10" color="primary"></v-btn>
      </v-form>
    </template>
  </app-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AppPage from "../components/ui/AppPage.vue";

const route = useRoute();
const a = ref<Date>(new Date());

onMounted(() => {
  console.log(route.params.id);
});
</script>

<style scoped>
</style>
