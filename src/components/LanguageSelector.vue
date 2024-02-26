<script lang="ts" setup>
import { setItem } from '@/config/localStorage'
import { LOCAL_STORAGE } from '@/constants'
</script>

<template>
  <v-select
    :items="$i18n.availableLocales.map(value => ({ title: value.toUpperCase(), value }))"
    @update:model-value="(val: string) => setItem(LOCAL_STORAGE.LANG, val)"
    bg-color="transparent"
    color="transparent"
    flat
    hide-details
    hide-no-data
    hide-selected
    single-line
    v-model="$i18n.locale"
    variant="solo"
  >
    <template v-slot:append-inner></template>
  </v-select>
</template>

<style lang="scss" scoped>
.v-select {
  max-width: 5.3rem;
}
</style>
