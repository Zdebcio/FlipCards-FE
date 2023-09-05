<script lang="ts" setup>
import { useTheme } from 'vuetify'

const vTheme = useTheme()

const props = withDefaults(
  defineProps<{
    title: string
    icon: string
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
      <v-list-item-title class="text-h5 py-8 d-flex align-center">{{ title }}</v-list-item-title>

      <v-list-item-subtitle class="text-h3 flex-grow-0 subtitle">
        <div id="subtitle-wrapper" class="d-flex flex-0-1">
          <slot name="content"></slot>
        </div>
      </v-list-item-subtitle>
      <v-icon :color="props.bgColor" class="bg-icon">{{ icon }}</v-icon>
    </div>
  </v-list-item>
</template>

<style lang="scss" scoped>
.list-item {
  position: relative;
  width: auto;
  color: rgb(var(--v-theme-white));
  opacity: 1;
  z-index: 0;
  &.v-list-item--rounded {
    border-radius: 1rem;
  }

  &:deep() > .v-list-item__content {
    height: auto;

    & > div {
      width: 100%;
      min-height: 10rem;
      height: 30vw;
    }
  }
}

.bg-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 8rem;
  z-index: -1;
}

.subtitle {
  opacity: 1;
}
</style>
