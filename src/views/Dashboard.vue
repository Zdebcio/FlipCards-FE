<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

import type { Tile } from '@/interfaces'

import PlaylistPlayButton from '@/components/PlaylistPlayButton.vue'
import TilesNav from '@/components/TilesNav.vue'
import ChartBarIcon from '@/components/icons/ChartBarIcon.vue'
import CreateListIcon from '@/components/icons/CreateListIcon.vue'
import ListIcon from '@/components/icons/ListIcon.vue'
import ReplayIcon from '@/components/icons/ReplayIcon.vue'
import { PATHS } from '@/constants'

const tiles: Tile[] = [
  {
    title: t('dashboard.navigation.lastOpened'),
    icon: ReplayIcon,
    bgColor: 'blue',
    to: PATHS.HOME,
    cols: 12,
    sm: 12,
    xl: 8,
    content: PlaylistPlayButton
  },
  {
    title: t('dashboard.navigation.showLists'),
    icon: ListIcon,
    bgColor: 'pink',
    to: PATHS.USER_LISTS,
    cols: 12,
    sm: 6,
    xl: 4
  },
  {
    title: t('dashboard.navigation.statistics'),
    icon: ChartBarIcon,
    bgColor: 'orange',
    to: '/',
    cols: 12,
    sm: 6,
    xl: 4
  },
  {
    title: t('dashboard.navigation.createList'),
    icon: CreateListIcon,
    bgColor: 'green',
    to: PATHS.NEW_LIST,
    fullWidth: true,
    cols: 12,
    sm: 12,
    xl: 8
  }
]
</script>

<template>
  <TilesNav :tiles="tiles" />
</template>
