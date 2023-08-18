<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '../store/Auth'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'

const { t } = useI18n()

const tasksStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  tasksStore.login({ email: email.value, password: password.value })
}
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <div class="my-7">
      <TextField v-model="email" :placeholder="t('register.fields.email')" name="email" />
      <TextField
        v-model="password"
        :placeholder="t('register.fields.password')"
        name="password"
        type="password"
      />
    </div>
    <div class="d-flex justify-space-between">
      <Button to="/auth/register" variant="text">
        {{ t('login.registerViewButton') }}
      </Button>
      <Button width="120" type="submit">{{ t('login.loginButton') }}</Button>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
