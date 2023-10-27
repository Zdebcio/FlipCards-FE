<script lang="ts" setup>
import { ref } from 'vue'

import { useTheme } from 'vuetify'

import { setItem } from '@/config/localStorage'
import { Theme } from '@/interfaces'

const theme = useTheme()

const currentTheme = ref(theme.global.name.value)

const toggleTheme = () => {
  theme.global.name.value = currentTheme.value
  setItem('theme', currentTheme.value)
}
</script>

<template>
  <v-switch
    class="theme-switch"
    hide-details
    inset
    color="primary"
    false-icon="mdi-white-balance-sunny"
    true-icon="mdi-weather-night"
    :false-value="Theme.Light"
    :true-value="Theme.Dark"
    v-model="currentTheme"
    @change="toggleTheme"
  ></v-switch>
</template>

<style lang="scss" scoped>
.theme-switch:deep() {
  & .v-switch__track,
  & .v-switch__thumb {
    background-color: rgb(var(--v-theme-primary));
    opacity: 1;
  }

  & .v-switch__thumb {
    color: rgb(var(--v-theme-white));
  }
  & .v-icon {
    color: rgb(var(--v-theme-white));
    opacity: 1;
  }
}
</style>
