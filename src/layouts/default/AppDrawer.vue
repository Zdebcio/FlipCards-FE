<script lang="ts" setup>
import { useDisplay } from 'vuetify'

defineProps<{
  open: boolean
}>()

defineEmits<{
  (e: 'openDrawer', value?: boolean): void
}>()

const { mobile } = useDisplay()
</script>

<template>
  <v-navigation-drawer
    color="background-darken"
    :temporary="mobile"
    :model-value="mobile ? open : true"
    :scrim="false"
    :border="0"
    :elevation="0"
  >
    <v-list>
      <v-list-item></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-overlay
    scrim="overlay"
    v-if="mobile"
    :model-value="open"
    @click="$emit('openDrawer', false)"
    persistent
    :z-index="1003"
  ></v-overlay>
</template>
