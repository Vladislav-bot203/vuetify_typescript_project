<template>
    <div class="container">
        <v-card 
          class="w-75 h-100  bg-blue-grey-darken-3 mt-16"
          min-width="350"
        >
            <slot name="title"></slot>
            <slot name="body"></slot>
            <app-alert class="w-75"></app-alert>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import AppAlert from '../AppAlert.vue';

</script>

<style scoped>
.container {
    padding-left: 56px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
    padding-bottom: 40px;
    flex-wrap: wrap;
}
</style>