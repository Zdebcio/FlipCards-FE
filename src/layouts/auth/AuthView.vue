<script lang="ts" setup>
import Logo from '@/components/icons/Logo.vue'
</script>

<template>
  <v-sheet
    color="background-darken"
    class="d-flex flex-column align-center pa-10 ma-10 w-100 card-container"
    :elevation="5"
    rounded
  >
    <Logo width="200px" alt="Flip Cards logo" />
    <div class="d-flex flex-column w-100">
      <router-view />
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
.card-container {
  max-width: 500px;
  border-radius: 10px;
  border: 2px solid rgb(var(--v-theme-accent));
  min-height: 300px;
}
</style>
