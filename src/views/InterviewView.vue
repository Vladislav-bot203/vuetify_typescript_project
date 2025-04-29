<template>
  <app-page>
    <template #title>
      <v-card-title>Editing Interview</v-card-title>
    </template>

    <template #body>
      <v-form
        class="bg-blue-grey-darken-2 d-flex flex-column rounded-lg align-center"
      >
        <v-container
          class="rounded-lg bg-blue-grey-darken-1 ma-8"
          min-width="350"
          style="border: 2px solid #2979ff"
        >
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Company"
            :model-value="company"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Description link"
            :model-value="description"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="HR Name"
            :model-value="name"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Telegram"
            :model-value="telegram"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="WhatsApp"
            :model-value="whatsApp"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Phone Number"
            :model-value="phone"
          ></v-text-field>
          <v-container
            class="d-flex justify-space-between pa-0 ga-4"
            min-width="350"
          >
            <v-text-field
              type="number"
              variant="outlined"
              autocomplete="off"
              label="Salary From"
              :model-value="salaryFrom"
            ></v-text-field>
            <v-text-field
              type="number"
              variant="outlined"
              autocomplete="off"
              label="Salary To"
              :model-value="salaryTo"
            ></v-text-field>
          </v-container>
          <v-btn
            prepend-icon="mdi-plus"
            text="Add new stage"
            color="primary"
            @click="addStage"
          ></v-btn>
        </v-container>
        <v-container class="pa-0" v-if="stages">
          <app-stage v-for="(stage, id) in stages" :key="id" :stage="stage" @remove="deleteStage(id)"></app-stage>
        </v-container>
        <v-container
          class="pa-3 bg-blue-grey-darken-1 d-flex justify-center align-center rounded-lg mb-6"
          min-width="350"
          style="border: 2px solid #2979ff"
        >
          <v-radio-group inline class="d-flex justify-center" :model-value="result">
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
import { onMounted } from "vue";
import AppPage from "../components/ui/AppPage.vue";
import useEditInterview from "../hooks/editInterview";
import AppStage from "../components/AppStage.vue";

const editInterview= useEditInterview();

const {
  getInterview,
  company,
  description,
  name,
  telegram,
  whatsApp,
  phone,
  salaryFrom,
  salaryTo,
  result,
  stages,
  addStage,
  deleteStage
} = editInterview;

onMounted(() => {
  getInterview()
});
</script>

<style scoped></style>
