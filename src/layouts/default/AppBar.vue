<script lang="ts" setup>
import { useDisplay } from 'vuetify'

defineEmits<{
  (e: 'openDrawer', value?: boolean): void
}>()

const { mobile } = useDisplay()
</script>

<template>
  <v-app-bar
    scroll-behavior="hide"
    :border="0"
    flat
    elevation="2"
    color="background-darken"
    scroll-threshold="220"
  >
    <v-app-bar-nav-icon v-if="mobile" @click="$emit('openDrawer')"></v-app-bar-nav-icon>
  </v-app-bar>
</template>
