<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { AxiosError } from 'axios'
import { type PublicPathState, useForm } from 'vee-validate'

import TextField from '@/components/TextField.vue'
import paths from '@/constants/paths'
import router from '@/router'
import { registerSchema } from '@/schemas'
import { useAuthRegister } from '@/services/api'

const { t } = useI18n()
const { mutateAsync, isLoading, error, isError } = useAuthRegister()

const { defineComponentBinds, handleSubmit } = useForm({
  validationSchema: registerSchema
})

const vuetifyConfig = (state: PublicPathState) => ({
  props: {
    'error-messages': state.errors
  },
  validateOnValueUpdate: true
})

const email = defineComponentBinds('email', vuetifyConfig)
const password = defineComponentBinds('password', vuetifyConfig)
const confirmPassword = defineComponentBinds('confirmPassword', vuetifyConfig)

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await mutateAsync({ email: values.email, password: values.password })
    actions.resetForm()
    router.push(paths.LOGIN)
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 409:
          return actions.setFieldError('email', t('validation.conflict_email'))
        case 422:
          return error.response.data.map((error: any) =>
            actions.setFieldError(error.path[0], t(`validation.invalid_${error.path[0]}`))
          )
      }
    }

    actions.resetField('password')
    actions.resetField('confirmPassword')
  }
})

const unhandledError = () => {
  return isError.value && ![409, 422].includes(error.value?.response?.status || 0)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mt-4 mb-4">
      <TextField v-bind="email" name="email" :placeholder="t('register.fields.email')" />
      <TextField
        v-bind="password"
        name="password"
        type="password"
        :placeholder="t('register.fields.password')"
      />
      <TextField
        v-bind="confirmPassword"
        name="confirm-password"
        type="password"
        :placeholder="t('register.fields.confirmPassword')"
      />
      <span v-show="unhandledError()" class="text-caption text-error">{{
        t('validation.otherForm')
      }}</span>
    </div>
    <div class="d-flex justify-space-between align-center">
      <v-btn-text :to="paths.LOGIN" variant="text">
        {{ t('register.loginViewButton') }}
      </v-btn-text>
      <v-btn type="submit" :loading="isLoading">{{ t('register.registerButton') }}</v-btn>
    </div>
  </form>
</template>
