<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { GenericKeys } from '@/interfaces'
import type { MainLists } from '@/interfaces/list.interface'
import type { AxiosError } from 'axios'
const { t } = useI18n()

withDefaults(
  defineProps<{
    data?: MainLists[]
    isFetching?: boolean
    isFetchingNextPage?: boolean
    hasNextPage?: boolean
    error?: AxiosError<GenericKeys, any> | null
    isError?: boolean
  }>(),
  { isFetching: false, isFetchingNextPage: false, hasNextPage: false, isError: false }
)

defineEmits(['fetchNextPage'])
</script>

<template>
  <div class="d-flex flex-column" v-if="data">
    <v-list v-for="(group, index) in data" :key="index">
      <v-list-item v-for="item in group.data" :key="item.id" class="py-2" :value="item">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle v-if="item.subtitle" class="font-italic">
          {{ item.subtitle }}
        </v-list-item-subtitle>
        <template v-slot:prepend>
          <v-btn-icon color="transparent" size="small" flat>
            <v-icon class="text-h5">mdi-pencil</v-icon>
          </v-btn-icon>
        </template>
        <template v-slot:append>
          <v-btn-icon color="transparent" size="small" flat>
            <v-icon class="text-h5" color="error">mdi-delete</v-icon>
          </v-btn-icon>
        </template>
      </v-list-item>
    </v-list>
    <v-alert
      v-if="isError"
      type="error"
      :title="t('validation.otherTitle')"
      :text="t('validation.otherSubtitle')"
    ></v-alert>
    <v-btn
      class="align-self-center mx-2 my-4"
      variant="outlined"
      color="text"
      size="small"
      @click="$emit('fetchNextPage')"
      :disabled="!hasNextPage"
      :loading="isFetching || isFetchingNextPage"
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

.v-list-item:deep() {
  grid-template-areas: 'content prepend append';
  grid-template-columns: auto max-content max-content;
  border-bottom: 0.1rem solid rgb(var(--v-theme-background-darken-1));

  & .v-list-item-title {
    font-size: 1.17rem;
  }

  & .v-list-item__prepend {
    width: auto;
    flex-direction: row-reverse;
    & .v-list-item__spacer {
      width: 1rem;
    }
  }
  & .v-list-item__append {
    width: auto;
    & .v-list-item__spacer {
      width: 0.5rem;
    }
  }
}
</style>
