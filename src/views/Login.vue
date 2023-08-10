<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'

const { t } = useI18n()
</script>

<template>
  <div class="my-7">
    <TextField :placeholder="t('register.fields.email')" />
    <TextField :placeholder="t('register.fields.password')" />
  </div>
  <div class="d-flex justify-space-between">
    <Button to="/auth/register" variant="text">
      {{ t('login.registerViewButton') }}
    </Button>
    <Button width="120">{{ t('login.loginButton') }}</Button>
  </div>
</template>

<style lang="scss" scoped></style>
