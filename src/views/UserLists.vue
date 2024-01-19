<script lang="ts" setup>
import MainList from '@/components/MainList.vue'
</script>

<template>
  <div>
    <header>
      <h1>LIST 1</h1>
      <div class="header-action">
        <v-btn-icon color="transparent" class="text-h4" size="large" flat>
          <v-icon class="text-h4">mdi-plus</v-icon>
        </v-btn-icon>
        <v-btn-icon color="primary" size="large" flat>
          <v-icon class="text-h5">mdi-play</v-icon>
        </v-btn-icon>
      </div>
    </header>
    <section>
      <MainList />
    </section>
  </div>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 0.1rem solid rgb(var(--v-theme-background-darken-1));
  padding: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

.header-action {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  margin-left: 1rem;

  & > * {
    margin-left: 1rem;
  }
}
</style>
