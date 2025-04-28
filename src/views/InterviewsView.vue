<template>
  <app-page>
    <template #title>
      <v-card-title>Interviews</v-card-title>
    </template>
    <template #body>
      <v-data-table :items="interviews" :headers="headers" item-key="id" class="bg-blue-grey-darken-2">
        <template #item.vacancyLink="{ item }">
            <a :href="item.vacancyLink">Go to vacancy description</a>
        </template>
    
        <template #item.contactTelegram="{ item }">
          <a
            v-if="item.contactTelegram"
            :href="`https://t.me/${item.contactTelegram}`"
            :title="`Send a message in Telegram: ${item.contactTelegram}`"
          >
            <v-icon icon="mdi-send-variant-outline" color="primary"></v-icon>
          </a>
          <a
            v-if="item.contactWhatsApp"
            :href="`https://wa.me/${item.contactWhatsApp}`"
            :title="`Send message in WhatsApp: ${item.contactWhatsApp}`"
          >
            <v-icon icon="mdi-whatsapp" color="green"></v-icon>
          </a>
          <a
            v-if="item.contactPhone"
            :href="`https://tel:${item.contactPhone}`"
            :title="`Make a phone call: ${item.contactPhone}`"
          >
            <v-icon icon="mdi-phone-classic" color="amber-darken-1"></v-icon>
          </a>
        </template>

        <template #item.id="{ item }">
            <span class="d-flex ga-2 justify-center	">
                <router-link :to="`/interview/${item.id}`" v-slot="{navigate}" custom>
                  <v-btn icon="mdi-pencil-box" color="deep-orange-lighten-1" @click="navigate"></v-btn>
                </router-link>
                <v-btn icon="mdi-delete-outline" color="red-accent-3"></v-btn>
            </span>
        </template>
      </v-data-table>
    </template>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "../components/ui/AppPage.vue";
import useInterviewsStore from "../stores/interviews-storage";
import useInterviewsList from "../hooks/interviewsList";
import { onMounted, computed } from "vue";

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
