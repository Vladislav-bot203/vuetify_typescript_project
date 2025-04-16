<template>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      class="bg-blue-grey-darken-3" 
    >
      <v-list-item prepend-icon="mdi-account-circle" title="User name" nav>
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-account"
          title="My Account"
          value="My Account"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cog"
          title="Settings"
          value="Settings"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Users"
          value="users"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const drawer = ref(true);
const rail = ref(true);

</script>

<style scoped>
.scroll {
    scrollbar-width: 0;
}
</style>
