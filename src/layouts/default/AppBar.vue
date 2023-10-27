<script lang="ts" setup>
import { ref } from 'vue'

import { useDisplay, useTheme } from 'vuetify'

import MenuButton from '@/components/MenuButton.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import { setItem } from '@/config/localStorage'
import { Theme } from '@/interfaces'

const theme = useTheme()

const currentTheme = ref(theme.global.name.value)

const toggleTheme = () => {
  theme.global.name.value = currentTheme.value
  setItem('theme', currentTheme.value)
}

defineProps<{
  open: boolean
}>()

defineEmits<{
  openDrawer: [value?: boolean]
}>()

const { mobile } = useDisplay()
</script>

<template>
  <v-app-bar
    scroll-behavior="hide"
    :border="0"
    flat
    elevation="2"
    color="background-darken-1"
    scroll-threshold="220"
  >
    <div class="w-100 d-flex justify-space-between align-center">
      <MenuButton :visible="!!mobile" :open="open" @click="$emit('openDrawer')" />
      <LogoIcon height="50px" />
      <div class="d-flex align-center">
        <v-switch
          class="theme-switch me-5"
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
        <v-btn icon color="primary" variant="elevated" class="mx-2">
          <!-- TODO: integrate when API provided -->
          <v-avatar color="primary">Z</v-avatar>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
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
