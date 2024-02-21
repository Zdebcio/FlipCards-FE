<script lang="ts" setup>
import type { EventType, MainListDataItem } from '@/interfaces'

defineProps<{
  item: MainListDataItem
}>()

const clickHandler = (e: EventType, callback: (id: string) => void, id: string) => {
  e.preventDefault()
  e.stopPropagation()
  callback(id)
}
</script>

<template>
  <v-list-item
    :to="item.hrefItem"
    :value="item"
    @click="e => item.clickItem && clickHandler(e, item.clickItem, item.id)"
    class="py-2"
  >
    <v-list-item-title>{{ item.title }}</v-list-item-title>
    <v-list-item-subtitle v-if="item.subtitle" class="font-italic">
      {{ item.subtitle }}
    </v-list-item-subtitle>
    <template v-if="item.editItem || item.hrefEdit" v-slot:prepend>
      <v-btn-icon
        :to="item.hrefEdit"
        @click="(e: EventType) => item.editItem && clickHandler(e, item.editItem, item.id)"
        color="transparent"
        flat
        size="small"
      >
        <v-icon class="text-h5">mdi-pencil</v-icon>
      </v-btn-icon>
    </template>
    <template v-if="item.removeItem || item.hrefRemove" v-slot:append>
      <v-btn-icon
        :to="item.hrefRemove"
        @click="(e: EventType) => item.removeItem && clickHandler(e, item.removeItem, item.id)"
        color="transparent"
        flat
        size="small"
      >
        <v-icon class="text-h5" color="error">mdi-delete</v-icon>
      </v-btn-icon>
    </template>
  </v-list-item>
</template>

<style lang="scss" scoped>
.v-list-item:deep() {
  grid-template-areas: 'content prepend append';
  grid-template-columns: auto max-content max-content;
  border-bottom: 0.1rem solid rgb(var(--v-theme-background-darken-1));

  & .v-list-item-title {
    font-size: 1.17rem;
  }

  & .v-list-item__prepend {
    width: auto;
    flex-direction: row-reverse;
    & .v-list-item__spacer {
      width: 1rem;
    }
  }
  & .v-list-item__append {
    width: auto;
    & .v-list-item__spacer {
      width: 0.5rem;
    }
  }
}
</style>
