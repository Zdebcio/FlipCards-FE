<script lang="ts" setup>
import { useDisplay } from 'vuetify'

import NavTile from './NavTile.vue'
import PlaylistPlayButton from './PlaylistPlayButton.vue'
import ChartBarIcon from './icons/ChartBarIcon.vue'
import CreateListIcon from './icons/CreateListIcon.vue'
import ListIcon from './icons/ListIcon.vue'
import ReplayIcon from './icons/ReplayIcon.vue'

const { thresholds } = useDisplay()

const tiles = [
  {
    title: 'Last opened',
    icon: ReplayIcon,
    bgColor: 'blue',
    to: '/',
    width: 12,
    sm: 12,
    xl: 8,
    content: PlaylistPlayButton
  },
  {
    title: 'All created lists',
    icon: ListIcon,
    bgColor: 'pink',
    to: '/',
    width: 12,
    sm: 6,
    xl: 4
  },
  {
    title: 'Statistics',
    icon: ChartBarIcon,
    bgColor: 'orange',
    to: '/',
    width: 12,
    sm: 6,
    xl: 4
  },
  {
    title: 'Create new list',
    icon: CreateListIcon,
    bgColor: 'green',
    to: '/',
    fullWidth: true,
    width: 12,
    sm: 12,
    xl: 8
  }
]
</script>

<template>
  <section class="w-100 d-flex flex-column align-center">
    <v-list class="w-100" :max-width="thresholds.xl">
      <v-container fluid>
        <v-row>
          <v-col
            class="pa-1"
            v-for="tile in tiles"
            :key="tile.title"
            :cols="tile.width"
            :sm="tile.sm"
            :xl="tile.xl"
          >
            <NavTile :title="tile.title" :bg-color="tile.bgColor" :icon="tile.icon" :to="tile.to">
              <template v-if="tile.content" v-slot:content>
                <component :is="tile.content"></component>
              </template>
            </NavTile>
          </v-col>
        </v-row>
      </v-container>
    </v-list>
  </section>
</template>
