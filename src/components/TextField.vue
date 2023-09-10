<script lang="ts" setup></script>

<template>
  <v-text-field class="textfield text-body-1"></v-text-field>
</template>

<style lang="scss" scoped>
.textfield:deep() {
  & .v-field {
    font-size: inherit;

    & .v-field__input {
      padding: 1rem;
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
