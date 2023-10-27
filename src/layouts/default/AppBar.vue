<script lang="ts" setup>
import { useDisplay } from 'vuetify'

import MenuButton from '@/components/MenuButton.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'

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
        <ThemeSwitcher class="me-5" />
        <v-btn icon color="primary" variant="elevated" class="mx-2">
          <!-- TODO: integrate when API provided -->
          <v-avatar color="primary">Z</v-avatar>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>
