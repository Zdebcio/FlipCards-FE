<script lang="ts" setup>
import type { Component } from 'vue'

import { useTheme } from 'vuetify'

const vTheme = useTheme()

const props = withDefaults(
  defineProps<{
    title: string
    icon: Component
    bgColor?: string
  }>(),
  {
    bgColor: 'primary'
  }
)

const colors = {
  light: vTheme.current.value.colors[props.bgColor] || props.bgColor,
  dark: vTheme.current.value.colors[`${props.bgColor}-darken-1`]
}

const setBackgroundColor = () => {
  if (!colors.dark) return colors.light
  return `linear-gradient(160deg, ${colors.light} 0%, ${colors.dark} 100%)`
}
</script>

<template>
  <v-list-item
    :style="{ background: setBackgroundColor() }"
    class="list-item pa-0"
    rounded
    variant="plain"
    :active="false"
  >
    <div class="d-flex flex-column justify-space-between position-relative pa-3">
      <v-list-item-title class="text-h5 mt-3 d-flex align-center title">{{
        title
      }}</v-list-item-title>

      <v-list-item-subtitle class="text-h3 flex-grow-0 subtitle">
        <div id="subtitle-wrapper" class="d-flex flex-0-1">
          <slot name="content"></slot>
        </div>
      </v-list-item-subtitle>
      <component :is="icon" :fill="colors.light" class="bg-icon"></component>
    </div>
  </v-list-item>
</template>

<style lang="scss" scoped>
@use '../styles/variables.scss';
.list-item {
  position: relative;
  width: auto;
  color: rgb(var(--v-theme-white));
  opacity: 1;
  z-index: 0;

  @media (min-width: map-get(variables.$custom-breakpoints, 'xs')) {
    font-size: 1.4rem;
  }
  @media (min-width: map-get(variables.$custom-breakpoints, 'lg')) {
    font-size: 2rem;
  }
  @media (min-width: map-get(variables.$custom-breakpoints, 'xl')) {
    font-size: 2.4rem;
  }

  &:deep() > .v-list-item__content {
    height: auto;

    & > div {
      width: 100%;
      min-height: 12rem;
      height: 30vw;

      @media (min-width: map-get(variables.$custom-breakpoints, 'lg')) {
        height: 30vh;
      }
    }
  }

  &.v-list-item--rounded {
    border-radius: 0.5em;
  }

  & .title {
    font-size: 1.2em !important;
    line-height: 1.6em;
  }

  & .subtitle {
    opacity: 1;
    font-size: 2em !important;
  }

  .bg-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 8rem;
    z-index: -1;
    height: 70%;
  }
}
</style>
