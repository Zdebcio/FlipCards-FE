<script lang="ts" setup>
import MainHeader from './MainHeader.vue'

import type { UserList } from '@/interfaces/list.interface'

import { PATHS } from '@/constants'

defineProps<{
  listInfo?: UserList
}>()
</script>

<template>
  <MainHeader :title="listInfo?.name ?? ''">
    <v-btn-icon
      :to="`${PATHS.NEW_FLASHCARD}?listID=${listInfo?._id}`"
      class="text-h4"
      color="transparent"
      flat
      size="large"
    >
      <v-icon class="text-h4">mdi-plus</v-icon>
    </v-btn-icon>
    <v-btn-icon color="primary" size="large" flat>
      <v-icon class="text-h5">mdi-play</v-icon>
    </v-btn-icon>
  </MainHeader>
</template>

<style lang="scss" scoped></style>
