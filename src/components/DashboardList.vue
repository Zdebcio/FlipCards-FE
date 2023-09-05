<script lang="ts" setup>
import ListTile from './ListTile.vue'
import PlaylistPlayButton from './PlaylistPlayButton.vue'

const tiles = [
  {
    title: 'Last opened',
    icon: 'mdi-replay',
    bgColor: 'blue',
    to: '/',
    width: 12,
    sm: 12,
    content: PlaylistPlayButton
  },
  {
    title: 'All created lists',
    icon: 'mdi-list-box-outline',
    bgColor: 'pink',
    to: '/',
    width: 12,
    sm: 6
  },
  {
    title: 'Statistics',
    icon: 'mdi-chart-bar',
    bgColor: 'orange',
    to: '/',
    width: 12,
    sm: 6
  },
  {
    title: 'Create new list',
    icon: 'mdi-playlist-plus',
    bgColor: 'green',
    to: '/',
    fullWidth: true,
    width: 12,
    sm: 12
  }
]
</script>

<template>
  <v-list class="w-100">
    <v-container>
      <v-row>
        <v-col
          class="pa-1"
          v-for="tile in tiles"
          :key="tile.title"
          :cols="tile.width"
          :sm="tile.sm"
        >
          <ListTile :title="tile.title" :bg-color="tile.bgColor" :icon="tile.icon" :to="tile.to">
            <template v-if="tile.content" v-slot:content>
              <component :is="tile.content"></component>
            </template>
          </ListTile>
        </v-col>
      </v-row>
    </v-container>
  </v-list>
</template>
