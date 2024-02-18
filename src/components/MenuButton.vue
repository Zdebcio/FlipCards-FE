<script lang="ts" setup>
defineProps<{
  open: boolean
  visible?: boolean
}>()
</script>

<template>
  <div>
    <v-btn-icon
      v-if="visible"
      color="transparent"
      flat
      size="x-large"
      class="mx-2"
      id="menu-btn"
      icon
    >
      <v-icon id="menu-icon" :icon="open ? 'mdi-window-close' : 'mdi-menu'" size="x-large"></v-icon>
    </v-btn-icon>
  </div>
</template>

<style lang="scss" scoped>
#menu-btn {
  & {
    #menu-icon {
      transition: font-size 0.25s;
    }
  }
  &:active {
    #menu-icon {
      font-size: 1.5em;
    }
  }
}
</style>
