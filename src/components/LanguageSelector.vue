<script lang="ts" setup>
import { setItem } from '@/config/localStorage'
import { LOCAL_STORAGE } from '@/constants'
</script>

<template>
  <v-select
    v-model="$i18n.locale"
    :items="$i18n.availableLocales.map(value => ({ title: value.toUpperCase(), value }))"
    bg-color="transparent"
    color="transparent"
    flat
    variant="solo"
    single-line
    hide-no-data
    hide-selected
    hide-details
    @update:model-value="(val: string) => setItem(LOCAL_STORAGE.LANG, val)"
  >
    <template v-slot:append-inner></template>
  </v-select>
</template>

<style lang="scss" scoped>
.v-select {
  max-width: 5.3rem;
}
</style>
