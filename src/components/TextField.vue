<script lang="ts" setup>
defineProps<{ label?: string }>()
</script>

<template>
  <label v-if="label">
    <span class="d-block text-h6 mb-2">{{ label }}</span>
    <v-text-field v-bind="$attrs" class="textfield text-body-1"></v-text-field>
  </label>
  <v-text-field v-else v-bind="$attrs" class="textfield text-body-1"></v-text-field>
</template>

<style lang="scss" scoped>
.textfield:deep() {
  & .v-field {
    font-size: inherit;

    & .v-field__input {
      padding: 0.5rem 1rem;
      min-height: auto;
    }
  }

  & .v-input__details {
    padding: 0.1rem 1rem 0;
    margin-bottom: 0.2rem;
  }

  & .v-messages {
    font-size: inherit;
  }
  & .v-field--variant-outlined .v-field__outline {
    border-radius: 15px;
    --v-field-border-width: 2px;
    --v-field-border-opacity: 0.7;
  }
  &:hover .v-field--variant-outlined .v-field__outline,
  & .v-field--focused.v-field--variant-outlined .v-field__outline {
    --v-field-border-opacity: 1;
  }

  & input[type='password'] {
    font-family: Roboto, Arial, sans-serif;
  }
}
</style>
