<template>
  <app-page>
    <template #title>
      <v-card-title>Editing Interview</v-card-title>
    </template>

    <template #body>
      <v-form class="bg-blue-grey-darken-2 d-flex-column pa-16 rounded">
        <v-container class="rounded bg-blue-grey-darken-1">
          <v-text-field
            clearable
            autocomplete="off"
            variant="outlined"
            label="Company"
            :model-value="a"
          ></v-text-field>
          <v-text-field
            clearable
            autocomplete="off"
            variant="outlined"
            label="Description link"
          ></v-text-field>
          <v-text-field
            clearable
            autocomplete="off"
            variant="outlined"
            label="HR Name"
          ></v-text-field>
          <v-text-field
            clearable
            autocomplete="off"
            variant="outlined"
            label="Telegram"
          ></v-text-field>
          <v-text-field
            clearable
            autocomplete="off"
            variant="outlined"
            label="WhatsApp"
          ></v-text-field>
          <v-text-field
            clearable
            autocomplete="off"
            variant="outlined"
            label="Phone Number"
          ></v-text-field>
          <v-container class="d-flex justify-space-between pa-0 ga-4">
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

        <v-container class="pa-3 mt-3 rounded bg-blue-grey-darken-1">
          <v-text-field
            clearable
            autocomplete="off"
            variant="outlined"
            label="Stage Name"
          ></v-text-field>
        </v-container>
      </v-form>
    </template>
  </app-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AppPage from "../components/ui/AppPage.vue";

const route = useRoute();
const a = ref("124");

onMounted(() => {
  console.log(route.params.id);
});
</script>

<style scoped></style>
