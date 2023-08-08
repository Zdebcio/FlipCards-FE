<script lang="ts" setup>
import AuthView from './AuthView.vue'
</script>

<template>
  <div>
    <v-layout class="bg-background">
      <v-main class="d-flex justify-center align-center page-height">
        <AuthView />
      </v-main>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
.page-height {
  min-height: 100vh;
}
</style>
