<template>
  <v-btn class="btn px-6 py-2"><slot></slot></v-btn>
</template>

<style lang="scss" scoped>
.btn {
  border-radius: 10px;
  height: auto !important;
  width: auto !important;

  &.v-btn--variant-text {
    text-transform: none;
  }
}
</style>
