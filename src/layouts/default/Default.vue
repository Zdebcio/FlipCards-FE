<script lang="ts" setup>
import { ref } from 'vue'

import { useDisplay } from 'vuetify'

import AppBar from './AppBar.vue'
import AppDrawer from './AppDrawer.vue'
import View from './View.vue'

const { mobile } = useDisplay()

const isDrawerOpen = ref(!mobile)

const handleDrawerOpen = (value: boolean = !isDrawerOpen.value) => {
  isDrawerOpen.value = value
}
</script>

<template>
  <v-layout class="rounded rounded-md bg-background">
    <AppBar @open-drawer="handleDrawerOpen" />
    <AppDrawer :open="isDrawerOpen" @open-drawer="handleDrawerOpen" />
    <View />
  </v-layout>
</template>
