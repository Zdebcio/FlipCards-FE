<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import CreateFlashcardForm from '@/components/CreateFlashcardForm.vue'
import { useGetList } from '@/hooks'

const { t } = useI18n()
const route = useRoute()

const { data: listData, isFetchedAfterMount } = useGetList(route.query.listID?.toString())
</script>

<template>
  <div class="px-4 py-2">
    <header class="d-flex w-100 justify-space-between align-center py-2">
      <h1>{{ t('createFlashcard.title') }}</h1>
      <CreateFlashcardForm :listData="listData" :isListFetched="isFetchedAfterMount" />
    </header>
  </div>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 2px solid rgb(var(--v-theme-background-darken-1));
}
</style>
