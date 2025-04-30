<template>
  <v-chip
    draggable
    size="small"
    :color="
      props.result === 'Offer'
        ? 'green'
        : props.result === 'Refusal'
        ? 'red'
        : 'primary'
    "
    variant="flat"
    :text="props.result"
  ></v-chip>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps(["result"]);
</script>
