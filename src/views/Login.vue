<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { type PublicPathState, useForm } from 'vee-validate'

import TextField from '@/components/TextField.vue'
import paths from '@/constants/paths'
import { useAuthLogin } from '@/hooks'
import router from '@/router'
import { loginSchema } from '@/schemas'

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

  return t('validation.otherForm')
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
    <div class="mt-4 mb-4">
      <TextField v-bind="email" :placeholder="t('register.fields.email')" name="email" />
      <TextField
        v-bind="password"
        :placeholder="t('register.fields.password')"
        name="password"
        type="password"
      />
    </div>
    <div class="d-flex justify-space-between align-center">
      <v-btn-text :to="paths.REGISTER" variant="text">
        {{ t('login.registerViewButton') }}
      </v-btn-text>
      <v-btn type="submit" :loading="isLoading">{{ t('login.loginButton') }}</v-btn>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
