<template>
    <div class="text-error" v-if="props?.errors">
        <span v-for="(error, id) in props?.errors?._errors" :key="id">{{ error }}</span>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(["errors"])
</script>