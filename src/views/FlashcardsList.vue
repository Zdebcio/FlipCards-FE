<script lang="ts" setup>
import { useRoute } from 'vue-router'

import type { MainLists } from '@/interfaces'

import MainHeader from '@/components/MainHeader.vue'
import MainList from '@/components/MainList.vue'
import { useGetFlashcards, useGetList } from '@/services/api'

const route = useRoute()

const listInfo = useGetList(route.params.listID)

const { data, error, isError, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
  useGetFlashcards(route.params.listID)

const convertDataToMainList = (): MainLists[] => {
  if (data.value)
    return data.value.pages.map(({ data, ...props }) => ({
      data: data.map(({ forwardText, backwardText, _id }) => ({
        title: forwardText,
        subtitle: backwardText,
        id: _id
      })),
      ...props
    }))

  return []
}
</script>

<template>
  <div>
    <MainHeader :title="listInfo.data.value?.name ?? ''">
      <v-btn-icon color="transparent" class="text-h4" size="large" flat>
        <v-icon class="text-h4">mdi-plus</v-icon>
        <v-btn-icon color="primary" size="large" flat>
          <v-icon class="text-h5">mdi-play</v-icon>
        </v-btn-icon>
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

<style lang="scss" scoped></style>
