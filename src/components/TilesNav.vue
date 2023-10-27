<script lang="ts" setup>
import { useDisplay } from 'vuetify'

import Tile from './Tile.vue'

import type { Tile as TileType } from '../interfaces'

const { thresholds } = useDisplay()

defineProps<{
  tiles: TileType[]
}>()
</script>

<template>
  <nav class="w-100 d-flex flex-column align-center">
    <v-list class="w-100" :max-width="thresholds.xl" bg-color="transparent">
      <v-container fluid>
        <v-row>
          <v-col
            class="pa-1"
            v-for="tile in tiles"
            :key="tile.title"
            :cols="tile.cols"
            :sm="tile.sm"
            :xl="tile.xl"
          >
            <Tile :title="tile.title" :bg-color="tile.bgColor" :icon="tile.icon" :to="tile.to">
              <template v-if="tile.content" v-slot:content>
                <component :is="tile.content"></component>
              </template>
            </Tile>
          </v-col>
        </v-row>
      </v-container>
    </v-list>
  </nav>
</template>
