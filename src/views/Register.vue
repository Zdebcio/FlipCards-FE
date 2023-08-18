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
const repeatPassword = ref('')

const handleSubmit = () => {
  tasksStore.register({ email: email.value, password: password.value })
}
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <div class="my-7">
      <TextField v-model="email" name="email" :placeholder="t('register.fields.email')" />
      <TextField
        v-model="password"
        name="password"
        type="password"
        :placeholder="t('register.fields.password')"
      />
      <TextField
        v-model="repeatPassword"
        name="repeat-password"
        type="password"
        :placeholder="t('register.fields.repeatPassword')"
      />
    </div>
    <div class="d-flex justify-space-between">
      <Button to="/auth/login" variant="text">
        {{ t('register.loginViewButton') }}
      </Button>
      <Button type="submit" min-width="120">{{ t('register.registerButton') }}</Button>
    </div>
  </form>
</template>
