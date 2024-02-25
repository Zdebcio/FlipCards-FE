<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="header-action">
      <slot></slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 0.1rem solid rgb(var(--v-theme-background-darken-1));
  padding: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

.header-action {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  margin-left: 1rem;

  &:deep() > * {
    margin-left: 1rem;
  }
}
</style>
