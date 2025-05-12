<template>
  <v-container
    v-if="
      props.interview.contactTelegram ||
      props.interview.contactWhatsApp ||
      props.interview.contactPhone
    "
    class="pa-0 d-flex ga-1 justify-center"
  >
    <v-tooltip
      location="top"
      :text="props.interview.contactTelegram"
      v-if="props.interview.contactTelegram"
    >
      <template #activator="{ props: activatorProps }">
        <a
          :href="`https://t.me/${props.interview.contactTelegram}`"
          v-bind="activatorProps"
        >
          <v-icon icon="mdi-send-variant-outline" color="primary"></v-icon>
        </a>
      </template>
    </v-tooltip>

    <v-tooltip
      location="top"
      :text="props.interview.contactWhatsApp"
      v-if="props.interview.contactWhatsApp"
    >
      <template #activator="{ props: activatorProps }">
        <a
          :href="`https://wa.me/${props.interview.contactWhatsApp}`"
          v-bind="activatorProps"
        >
          <v-icon icon="mdi-whatsapp" color="green"></v-icon>
        </a>
      </template>
    </v-tooltip>

    <v-tooltip
      location="top"
      :text="props.interview.contactPhone"
      v-if="props.interview.contactPhone"
    >
      <template #activator="{ props: activatorProps }">
        <a
          :href="`https://tel:${props.interview.contactPhone}`"
          v-bind="activatorProps"
        >
          <v-icon icon="mdi-phone-classic" color="amber-darken-1"></v-icon>
        </a>
      </template>
    </v-tooltip>
  </v-container>
  <v-container v-else class="d-flex justify-center">
    <v-tooltip text="No contacts added" location="top">
      <template #activator="{ props: activatorProps }">
        <v-icon
          icon="mdi-minus-circle-outline"
          v-bind="activatorProps"
          color="error"
        ></v-icon>
      </template>
    </v-tooltip>
  </v-container>
</template>

<script lang="ts" setup>
const props = defineProps(["interview"]);
</script>
