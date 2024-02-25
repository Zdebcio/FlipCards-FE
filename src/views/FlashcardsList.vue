<script lang="ts" setup>
import { useRoute } from 'vue-router'

import type { MainLists } from '@/interfaces'

import FlashcardsListHeader from '@/components/FlashcardsListHeader.vue'
import MainList from '@/components/MainList.vue'
import { useDeleteFlashcard, useGetFlashcards, useGetList } from '@/hooks'

const route = useRoute()

const listInfo = useGetList(route.params.listID)
const { data, isError, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, refetch } =
  useGetFlashcards(route.params.listID)
const { mutateAsync } = useDeleteFlashcard()

const removeItem = async (id: string) => {
  await mutateAsync({ flashcardID: id, listID: route.params.listID })
  refetch()
}

const convertDataToMainList = (): MainLists[] => {
  if (data.value)
    return data.value.pages.map(({ data, ...props }) => ({
      data: data.map(({ forwardText, backwardText, _id }) => ({
        title: forwardText,
        subtitle: backwardText,
        id: _id,
        removeItem
      })),
      ...props
    }))

  return []
}
</script>

<template>
  <div>
    <FlashcardsListHeader :listInfo="listInfo.data.value" />
    <section>
      <MainList
        @fetchNextPage="fetchNextPage"
        :data="convertDataToMainList()"
        :isFetching="isFetching"
        :isFetchingNextPage="isFetchingNextPage"
        :hasNextPage="hasNextPage"
        :isError="isError"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
