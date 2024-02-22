<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { type PublicPathState, useForm } from 'vee-validate'

import TextField from '@/components/TextField.vue'
import paths from '@/constants/paths'
import { useCreateList } from '@/hooks'
import router from '@/router'
import { listNameSchema } from '@/schemas'

const { defineComponentBinds, handleSubmit } = useForm({
  validationSchema: listNameSchema
})

const { mutateAsync, error, isLoading, isError, reset } = useCreateList()
const { t } = useI18n()

const displayApiError = () => {
  if (!isError.value) return ''
  if (error.value?.response?.status === 422) {
    return `${t('validation.invalidListName')}. ${t('validation.tooLong', { max: 20 })}`
  }

  return t('validation.otherForm')
}

const vuetifyConfig = (state: PublicPathState) => ({
  props: {
    'error-message': state.errors[0] || displayApiError()
  },
  validateOnValueUpdate: true
})

const listName = defineComponentBinds('name', vuetifyConfig)

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await mutateAsync(values)
    actions.resetForm()
    router.push(paths.USER_LISTS)
  } catch (error) {
    actions.resetField('name')
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="d-flex flex-column align-center py-2">
    <div class="w-100 d-flex flex-column align-center">
      <TextField
        :error-messages="listName['error-message']"
        :label="t('createList.nameLabel')"
        :placeholder="t('createList.namePlaceholder')"
        @change="reset()"
        class="w-100 text-field-input"
        name="name"
        v-bind="listName"
      />
    </div>
    <v-btn
      :disabled="!!listName['error-message']"
      :loading="isLoading"
      type="submit"
      class="mt-2"
      >{{ t('createList.button') }}</v-btn
    >
  </form>
</template>

<style lang="scss" scoped>
.text-field-input {
  max-width: 500px;
}
</style>
