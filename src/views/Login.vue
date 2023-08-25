<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { type PublicPathState, useForm } from 'vee-validate'

import paths from '../config/paths'
import router from '../router'
import { loginSchema } from '../schemas'
import { useAuthLogin } from '../services/api'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'

const { t } = useI18n()
const { mutateAsync, error, isLoading, isError } = useAuthLogin()

const { defineComponentBinds, handleSubmit } = useForm({
  validationSchema: loginSchema
})

const displayApiError = () => {
  if (!isError.value) return ''
  if (error.value?.response?.status === 422) {
    return t('validation.invalidLoginData')
  }

  return t('validation.other')
}

const vuetifyConfig = (state: PublicPathState) => ({
  props: {
    error: !!state.errors.length || isError.value,
    'error-messages': state.path === 'password' ? displayApiError() : ''
  },
  validateOnValueUpdate: true
})

const email = defineComponentBinds('email', vuetifyConfig)
const password = defineComponentBinds('password', vuetifyConfig)

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await mutateAsync(values)
    actions.resetForm()
    router.push(paths.HOME)
  } catch (error) {
    actions.resetField('password')
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="my-7">
      <TextField v-bind="email" :placeholder="t('register.fields.email')" name="email" />
      <TextField
        v-bind="password"
        :placeholder="t('register.fields.password')"
        name="password"
        type="password"
      />
    </div>
    <div class="d-flex justify-space-between">
      <Button :to="paths.REGISTER" variant="text">
        {{ t('login.registerViewButton') }}
      </Button>
      <Button width="120" type="submit" :loading="isLoading">{{ t('login.loginButton') }}</Button>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
