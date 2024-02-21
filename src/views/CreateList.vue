<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import CreateListForm from '@/components/CreateListForm.vue'

const { t } = useI18n()
</script>

<template>
  <div class="px-4 py-2">
    <header class="d-flex w-100 justify-space-between align-center py-2">
      <h1>{{ t('createList.title') }}</h1>
    </header>
    <CreateListForm />
  </div>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 2px solid rgb(var(--v-theme-background-darken-1));
}
</style>
