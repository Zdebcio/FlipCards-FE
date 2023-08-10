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
    <TextField :placeholder="t('register.fields.repeatPassword')" />
  </div>
  <div class="d-flex justify-space-between">
    <Button to="/auth/login" variant="text">
      {{ t('register.loginViewButton') }}
    </Button>
    <Button min-width="120">{{ t('register.registerButton') }}</Button>
  </div>
</template>
