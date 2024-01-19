<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { type PublicPathState, useForm } from 'vee-validate'

import TextField from '@/components/TextField.vue'
import paths from '@/config/paths'
import router from '@/router'
import { listNameSchema } from '@/schemas'
import { useCreateList } from '@/services/api'

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

  return t('validation.other')
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
    router.push(paths.HOME)
  } catch (error) {
    actions.resetField('name')
  }
})
</script>

<template>
  <div class="px-4 py-2">
    <header class="d-flex w-100 justify-space-between align-center py-2">
      <h1>{{ t('createList.title') }}</h1>
    </header>
    <form @submit.prevent="onSubmit" class="d-flex flex-column align-center py-2">
      <div class="w-100 d-flex flex-column align-center">
        <label for="list-name" class="text-h6 mb-2 text-uppercase">{{
          t('createList.nameLabel')
        }}</label>
        <TextField
          v-bind="listName"
          @change="reset()"
          :error-messages="listName['error-message']"
          id="list-name"
          name="name"
          :placeholder="t('createList.namePlaceholder')"
          class="w-100 list-name-input"
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
  </div>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 2px solid rgb(var(--v-theme-background-darken-1));
}

.list-name-input:deep() {
  max-width: 500px;

  & input {
    text-align: center;
  }

  & .v-messages__message {
    text-align: center;
  }
}
</style>
