<template>
  <app-page>
    <template #title>
      <v-card-title>Interviews</v-card-title>
    </template>
    <template #body>
      <v-text-field
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        clearable
        v-model="interviewsList.search.value"
      ></v-text-field>
      <v-container
        v-if="interviewsList.isFetchingData.value"
        class="d-flex justify-center"
      >
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
          width="15"
        ></v-progress-circular>
      </v-container>
      <v-data-table
        :items="interviews"
        :headers="headers"
        item-key="id"
        class="bg-blue-grey-darken-2"
        :search="interviewsList.search.value"
        v-else
      >
        <template #item.vacancyLink="{ item }">
          <a :href="item.vacancyLink">Go to vacancy description</a>
        </template>

        <template #item.contactTelegram="{ item }">
          <app-contacts :interview="item"></app-contacts>
        </template>

        <template #item.result="{ item }">
          <app-result :result="item.result ?? 'Unset'"></app-result>
        </template>

        <template #item.salaryFrom="{ item }">
          <span v-if="item.salaryFrom">$ {{ item.salaryFrom }}</span>
          <v-chip v-else size="small" draggable variant="flat">Unset</v-chip>
        </template>

        <template #item.stages="{ item }">
          <app-passed-stages :stages="item.stages"></app-passed-stages>
        </template>

        <template #item.id="{ item }">
          <span class="d-flex ga-2 justify-center">
            <router-link
              :to="`/interview/${item.id}`"
              v-slot="{ navigate }"
              custom
            >
              <v-btn
                icon="mdi-pencil-box"
                color="deep-orange-lighten-1"
                @click="navigate"
              ></v-btn>
            </router-link>
            <app-confirm
              @deleteInterview="interviewsList.deleteInterview(item.id)"
            ></app-confirm>
          </span>
        </template>
      </v-data-table>
    </template>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "../components/AppPage.vue";
import useInterviewsList from "../hooks/interviewsList";
import { onMounted, computed } from "vue";
import AppResult from "../components/AppResult.vue";
import AppPassedStages from "../components/AppPassedStages.vue";
import AppContacts from "../components/AppContacts.vue";
import useInterviewsStore from "../stores/interviews-storage";
import AppConfirm from "../components/AppConfirm.vue";

const interviewsStore = useInterviewsStore();
const interviewsList = useInterviewsList();
const interviews = computed(() => interviewsStore.interviews);
const { headers } = interviewsList;

onMounted(async () => {
  await interviewsList.getAllInteviews();
});
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.v-btn--icon.v-btn--density-default {
  width: calc(var(--v-btn-height) + 4px);
  height: calc(var(--v-btn-height) + 4px);
}
</style>
