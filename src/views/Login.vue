<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { toTypedSchema } from '@vee-validate/zod'
import { PublicPathState, useForm } from 'vee-validate'
import * as zod from 'zod'

import { useAuthLogin } from '../services/api'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'

const { t } = useI18n()
const { mutate, isError, status, reset } = useAuthLogin()

const loginSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('This is required'),
    password: zod.string().nonempty('This is required')
  })
)

const { defineComponentBinds, handleSubmit } = useForm({
  validationSchema: loginSchema
})

const vuetifyConfig = (state: PublicPathState) => ({
  props: {
    error: state.errors.length || isError.value
  },
  validateOnValueUpdate: true
})

const email = defineComponentBinds('email', vuetifyConfig)
const password = defineComponentBinds('password', vuetifyConfig)

const onSubmit = handleSubmit(values => {
  mutate(values)
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
      {{ error?.response?.status }}
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
