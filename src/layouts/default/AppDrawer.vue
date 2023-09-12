<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { type RouteRecordRaw } from 'vue-router'

import { useDisplay } from 'vuetify'

import router from '@/router'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  openDrawer: [value?: boolean]
}>()

const { t } = useI18n()
const { mobile } = useDisplay()

const handleOpenStatus = (status: boolean) => emit('openDrawer', status)

const drawerRoutes = router.options.routes.filter(route => route.meta?.drawer)

const getChildrenRoutes = (route: RouteRecordRaw) =>
  route.children?.filter(route => route.meta?.drawer)
</script>

<template>
  <v-navigation-drawer
    color="background-darken-1"
    :temporary="mobile"
    :model-value="mobile ? open : true"
    :scrim="false"
    :border="2"
    :elevation="2"
  >
    <div class="h-100 d-flex flex-column justify-center pb-3">
      <v-list class="flex-grow-1" v-for="route in drawerRoutes" :key="route.name">
        <v-list-item
          v-for="childRoute in getChildrenRoutes(route)"
          :key="childRoute.name"
          active-class="text-primary"
          :to="`${route.path}${childRoute.path}`"
          :exact="!!childRoute.meta?.exact"
          :ripple="{ class: 'text-primary' }"
          @click="handleOpenStatus(false)"
          >{{ t(`drawer.${String(childRoute.name)}`) }}</v-list-item
        >
      </v-list>
      <div class="pa-2 flex-grow-0">
        <v-btn block>{{ t(`drawer.Logout`) }}</v-btn>
      </div>
    </div>
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
