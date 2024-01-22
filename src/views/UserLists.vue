<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { MainLists } from '@/interfaces/list.interface'

import MainHeader from '@/components/MainHeader.vue'
import MainList from '@/components/MainList.vue'
import { useGetUserLists } from '@/services/api'

const { t } = useI18n()

const { data, error, isError, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
  useGetUserLists()

const convertDataToMainList = (): MainLists[] => {
  if (data.value)
    return data.value.pages.map(({ data, ...props }) => ({
      data: data.map(({ name, _id }) => ({ title: name, id: _id })),
      ...props
    }))

  return []
}
</script>

<template>
  <div>
    <MainHeader :title="t('userLists.title')">
      <v-btn-icon color="transparent" class="text-h4" size="large" flat>
        <v-icon class="text-h4">mdi-plus</v-icon>
      </v-btn-icon>
    </MainHeader>
    <section>
      <MainList
        @fetchNextPage="fetchNextPage"
        :data="convertDataToMainList()"
        :isFetching="isFetching"
        :isFetchingNextPage="isFetchingNextPage"
        :hasNextPage="hasNextPage"
        :error="error"
        :isError="isError"
      />
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
