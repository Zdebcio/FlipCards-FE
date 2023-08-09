<script lang="ts" setup></script>

<template>
  <v-text-field class="textfield"></v-text-field>
</template>

<style lang="scss" scoped>
.textfield:deep() {
  & .v-field--variant-outlined .v-field__outline {
    border-radius: 15px;
    --v-field-border-width: 2px;
    --v-field-border-opacity: 0.7;
  }
  &:hover .v-field--variant-outlined .v-field__outline,
  & .v-field--focused.v-field--variant-outlined .v-field__outline {
    --v-field-border-opacity: 1;
  }
}
</style>
