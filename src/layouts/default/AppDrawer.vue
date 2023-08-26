<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'

import { useDisplay } from 'vuetify'

import router from '../../router'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'openDrawer', value?: boolean): void
}>()

const { mobile } = useDisplay()

const handleOpenStatus = (status: boolean) => emit('openDrawer', status)

const drawerRoutes = router.options.routes.filter(route => route.meta?.drawer)

const getChildrenRoutes = (route: RouteRecordRaw) =>
  route.children?.filter(route => route.meta?.drawer)
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
    <v-list v-for="route in drawerRoutes" :key="route.name">
      <v-list-item
        v-for="childRoute in getChildrenRoutes(route)"
        :key="childRoute.name"
        :to="`${route.path}${childRoute.path}`"
        @click="handleOpenStatus(false)"
        >{{ childRoute.name }}</v-list-item
      >
    </v-list>
  </v-navigation-drawer>
  <v-overlay
    scrim="overlay"
    v-if="mobile"
    :model-value="open"
    @click="handleOpenStatus(false)"
    persistent
    :z-index="1003"
  ></v-overlay>
</template>
