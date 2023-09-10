<template>
  <v-btn class="btn"><slot></slot></v-btn>
</template>

<style lang="scss" scoped>
.btn {
  border-radius: 10px;

  &.v-btn--variant-text {
    text-transform: none;
  }
}
</style>
