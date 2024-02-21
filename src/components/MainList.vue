<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import MainListItem from './MainListItem.vue'

import type { MainLists } from '@/interfaces'
const { t } = useI18n()

withDefaults(
  defineProps<{
    data?: MainLists[]
    hasNextPage?: boolean
    isError?: boolean
    isFetching?: boolean
    isFetchingNextPage?: boolean
  }>(),
  { hasNextPage: false, isError: false, isFetching: false, isFetchingNextPage: false }
)

defineEmits(['fetchNextPage'])
</script>

<template>
  <div class="d-flex flex-column" v-if="data">
    <v-list v-for="(group, index) in data" :key="index">
      <MainListItem v-for="item in group.data" :key="item.id" :item="item" />
    </v-list>
    <v-alert
      :text="t('validation.otherSubtitle')"
      :title="t('validation.otherTitle')"
      border="start"
      class="w-100 mb-5"
      type="error"
      v-if="isError"
      variant="tonal"
    ></v-alert>
    <v-btn
      :disabled="!hasNextPage"
      :loading="isFetching || isFetchingNextPage"
      @click="$emit('fetchNextPage')"
      class="align-self-center mx-2 my-4"
      color="text"
      size="small"
      variant="outlined"
    >
      {{ t('userLists.loadMore') }}
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.v-list {
  background-color: transparent;
  padding-top: 0;
}
</style>
