<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" class="bg-blue-grey-darken-3">
    <v-list-item prepend-icon="mdi-account-circle" title="User name" nav>
      <template v-slot:append>
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav v-model:selected="selectedItem" @update:selected="handleSelection">
      <router-link to="/">
        <v-list-item prepend-icon="mdi-plus-box" title="Add new" value="/">
        </v-list-item>
      </router-link>
      <router-link to="/interviews">
        <v-list-item prepend-icon="mdi-table" title="Interviews" value="/interviews">
        </v-list-item>
      </router-link>
      <router-link to="/statistics">
        <v-list-item prepend-icon="mdi-panorama-sphere-outline" title="Statistics" value="/statistics"></v-list-item>
      </router-link>
    </v-list>
    <v-list class="d-flex">
      <v-btn :text="!rail ? 'Exit' : ''" prepend-icon="mdi-logout" variant="text" class="ma-auto"
        @click="logout"></v-btn>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { signOut, getAuth } from 'firebase/auth';
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const drawer = ref<boolean>(true);
const rail = ref<boolean>(true);
const selectedItem = ref<string[]>([route.path]);

const handleSelection = (newSelection: string[]): void => {
  if (newSelection.length === 0 && selectedItem.value.length > 0) {
    return;
  }
  selectedItem.value = newSelection;
};

async function logout(): Promise<void> {
  await signOut(getAuth());
  router.push({ name: 'Auth' });
}

</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
