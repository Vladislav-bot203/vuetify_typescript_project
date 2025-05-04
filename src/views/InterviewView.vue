<template>
  <app-page>
    <template #title>
      <v-card-title>Editing Interview</v-card-title>
    </template>

    <template #body>
      <v-container v-if="isFetchingData" class="d-flex justify-center">
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
          width="15"
      ></v-progress-circular>
      </v-container>
      <v-form
        class="bg-blue-grey-darken-2 d-flex flex-column rounded-lg align-center"
        v-else
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
            v-model="company"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Description link"
            v-model="description"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="HR Name"
            v-model="name"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Telegram"
            v-model="telegram"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="WhatsApp"
            v-model="whatsApp"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            label="Phone Number"
            v-model="phone"
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
              v-model="salaryFrom"
            ></v-text-field>
            <v-text-field
              type="number"
              variant="outlined"
              autocomplete="off"
              label="Salary To"
              v-model="salaryTo"
            ></v-text-field>
          </v-container>
          <v-btn
            prepend-icon="mdi-plus"
            text="Add new stage"
            color="primary"
            @click="addStage"
          ></v-btn>
        </v-container>
        <v-container class="pa-0" v-if="stages.length">
          <app-stage 
            v-for="(stage, id) in stages" 
            :key="id" 
            :stage="stage" 
            @remove="deleteStage(id)"
            @update:stage="updateStage(id, $event)"
          ></app-stage>
        </v-container>
        <v-container
          class="pa-3 bg-blue-grey-darken-1 d-flex justify-center align-center rounded-lg mb-6"
          min-width="350"
          style="border: 2px solid #2979ff"
        >
          <v-radio-group inline class="d-flex justify-center" v-model="result">
            <v-radio value="Offer" label="Offer" color="success"></v-radio>
            <v-radio value="Refusal" label="Refusal" color="error"></v-radio>
            <v-radio value="Unset" label="Unset" color="primary"></v-radio>
          </v-radio-group>
        </v-container>
        <v-btn text="save changes" class="mb-10" color="primary" @click="editInterview.saveChanges"></v-btn>
        <v-progress-linear
          color="deep-purple-accent-4"
          height="6"
          indeterminate
          rounded
          v-if="isSending"
        ></v-progress-linear>
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
  deleteStage,
  updateStage,
  isSending,
  isFetchingData
} = editInterview;

onMounted(() => {
  getInterview()
  console.log(stages)
});
</script>

<style scoped></style>
