<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { EventType, GenericKeys, MainLists } from '@/interfaces'
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

const clickHandler = (e: EventType, callback: (id: string) => void, id: string) => {
  e.preventDefault()
  e.stopPropagation()
  callback(id)
}
</script>

<template>
  <div class="d-flex flex-column" v-if="data">
    <v-list v-for="(group, index) in data" :key="index">
      <v-list-item
        v-for="item in group.data"
        :key="item.id"
        class="py-2"
        :value="item"
        :to="item.hrefItem"
        @click="e => item.clickItem && clickHandler(e, item.clickItem, item.id)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle v-if="item.subtitle" class="font-italic">
          {{ item.subtitle }}
        </v-list-item-subtitle>
        <template v-if="item.editItem || item.hrefEdit" v-slot:prepend>
          <v-btn-icon
            color="transparent"
            size="small"
            flat
            :to="item.hrefEdit"
            @click="(e: EventType) => item.editItem && clickHandler(e, item.editItem, item.id)"
          >
            <v-icon class="text-h5">mdi-pencil</v-icon>
          </v-btn-icon>
        </template>
        <template v-if="item.removeItem || item.hrefRemove" v-slot:append>
          <v-btn-icon
            color="transparent"
            size="small"
            flat
            :to="item.hrefRemove"
            @click="(e: EventType) => item.removeItem && clickHandler(e, item.removeItem, item.id)"
          >
            <v-icon class="text-h5" color="error">mdi-delete</v-icon>
          </v-btn-icon>
        </template>
      </v-list-item>
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
