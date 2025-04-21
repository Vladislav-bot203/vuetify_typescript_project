<template>
  <v-alert 
    closable 
    :icon="alertStore.icon" 
    :title="alertStore.title" 
    :text="alertStore.message"
    :type="alertStore.type"
    width="100%"
    class="ma-auto"
    density="compact"
  >
  </v-alert>
</template>

<script lang="ts" setup>
import useAlertStore from '../stores/alert-storage'

const alertStore = useAlertStore()

</script>
