<template>
  <app-page>
    <template #title>
      <v-card-title>{{ t("page.title[3]") }}</v-card-title>
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
          class="rounded-lg bg-blue-grey-darken-1 ma-8 custom-border"
          min-width="350"
        >
          <v-text-field
            autocomplete="off"
            variant="outlined"
            :label="t('interview.companyInput')"
            v-model="company"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            :label="t('interview.companyDescriptionInput')"
            v-model="description"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            :label="t('interview.hrNameInput')"
            v-model="name"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            :label="t('interview.telegramInput')"
            v-model="telegram"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            :label="t('interview.whatsAppInput')"
            v-model="whatsApp"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            variant="outlined"
            :label="t('interview.phoneInput')"
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
              :label="t('interview.salaryFromInput')"
              v-model="salaryFrom"
            ></v-text-field>
            <v-text-field
              type="number"
              variant="outlined"
              autocomplete="off"
              :label="t('interview.salaryToInput')"
              v-model="salaryTo"
            ></v-text-field>
          </v-container>
          <v-btn
            prepend-icon="mdi-plus"
            :text="t('interview.addButtonText')"
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
          class="pa-3 bg-blue-grey-darken-1 d-flex justify-center align-center rounded-lg mb-6 custom-border"
          min-width="350"
        >
          <v-radio-group inline class="d-flex justify-center" v-model="result">
            <v-radio value="Offer" :label="t('interview.offerRadioButton')" color="success"></v-radio>
            <v-radio value="Refusal" :label="t('interview.refusalRadioButton')" color="error"></v-radio>
            <v-radio value="Unset" :label="t('interview.unsetRadioButton')" color="primary"></v-radio>
          </v-radio-group>
        </v-container>
        <v-btn
          :text="t('interview.saveButtonText')"
          class="mb-10"
          color="primary"
          @click="editInterview.saveChanges"
        ></v-btn>
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
import AppPage from "../components/AppPage.vue";
import useEditInterview from "../hooks/editInterview";
import AppStage from "../components/AppStage.vue";
import { useI18n } from "vue-i18n";

const editInterview = useEditInterview();
const { t } = useI18n();

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
  isFetchingData,
} = editInterview;

onMounted(async () => {
  await getInterview();
});
</script>

<style>
.custom-border {
  border: 2px solid #2979ff !important;
}
</style>
