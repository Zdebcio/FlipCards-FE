<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { MainLists } from '@/interfaces'

import MainHeader from '@/components/MainHeader.vue'
import MainList from '@/components/MainList.vue'
import paths from '@/config/paths'
import { useGetInfiniteUserLists } from '@/services/api'

const { t } = useI18n()

const { data, error, isError, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
  useGetInfiniteUserLists()

const convertDataToMainList = (): MainLists[] => {
  if (data.value)
    return data.value.pages.map(({ data, ...props }) => ({
      data: data.map(({ name, _id }) => ({
        title: name,
        id: _id,
        hrefItem: `${paths.LIST}/${_id}`
      })),
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
