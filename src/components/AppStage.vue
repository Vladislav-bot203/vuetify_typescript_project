<template>
  <v-container
    class="pa-3 bg-blue-grey-darken-1 d-flex flex-column align-center mb-5 rounded-lg custom-border"
    min-width="350"
  >
    <v-text-field
      autocomplete="off"
      variant="outlined"
      :label="t('interview.stageNameInput')"
      width="100%"
      v-model="props.stage.name"
    ></v-text-field>
    <v-date-picker
      :title="t('interview.calendarTitle')"
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
      :label="t('interview.stageTextArea')"
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
import { useI18n } from "vue-i18n";
import { watch } from "vue";

const { t } = useI18n();
const props = defineProps(["stage"]);
const emits = defineEmits(["update:stage", "remove"]);

watch(props.stage, (newVal) => {
  emits("update:stage", newVal);
});

function handleRemove() {
  emits("remove");
}
</script>
