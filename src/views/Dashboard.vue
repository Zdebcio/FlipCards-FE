<script lang="ts" setup>
import type { Tile } from '../interfaces'

import PlaylistPlayButton from '@/components/PlaylistPlayButton.vue'
import TilesNav from '@/components/TilesNav.vue'
import ChartBarIcon from '@/components/icons/ChartBarIcon.vue'
import CreateListIcon from '@/components/icons/CreateListIcon.vue'
import ListIcon from '@/components/icons/ListIcon.vue'
import ReplayIcon from '@/components/icons/ReplayIcon.vue'

const tiles: Tile[] = [
  {
    title: 'Last opened',
    icon: ReplayIcon,
    bgColor: 'blue',
    // TODO: change when page will create
    to: '/',
    cols: 12,
    sm: 12,
    xl: 8,
    content: PlaylistPlayButton
  },
  {
    title: 'All created lists',
    icon: ListIcon,
    bgColor: 'pink',
    // TODO: change when page will create
    to: '/',
    cols: 12,
    sm: 6,
    xl: 4
  },
  {
    title: 'Statistics',
    icon: ChartBarIcon,
    bgColor: 'orange',
    // TODO: change when page will create
    to: '/',
    cols: 12,
    sm: 6,
    xl: 4
  },
  {
    title: 'Create new list',
    icon: CreateListIcon,
    bgColor: 'green',
    // TODO: change when page will create
    to: '/',
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
