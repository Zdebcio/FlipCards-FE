<script lang="ts" setup>
defineProps<{
  open: boolean
  visible?: boolean
}>()
</script>

<template>
  <v-btn-icon
    :disabled="!visible"
    color="transparent"
    flat
    size="x-large"
    class="mx-2"
    id="menu-btn"
    icon
  >
    <v-icon
      v-show="!!visible"
      id="menu-icon"
      :icon="open ? 'mdi-window-close' : 'mdi-menu'"
      size="x-large"
    ></v-icon>
  </v-btn-icon>
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
