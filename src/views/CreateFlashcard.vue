<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { type PublicPathState, useForm } from 'vee-validate'

import TextField from '@/components/TextField.vue'
import Textarea from '@/components/Textarea.vue'
import paths from '@/config/paths'
import router from '@/router'
import { createFlashcardSchema } from '@/schemas'
import { useCreateFlashcard } from '@/services/api'

const { defineComponentBinds, handleSubmit, errors } = useForm({
  validationSchema: createFlashcardSchema
})

const { mutateAsync, error, isLoading, isError, reset } = useCreateFlashcard()
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

const listIDs = defineComponentBinds('listIDs', vuetifyConfig)
const forwardText = defineComponentBinds('forwardText', vuetifyConfig)
const backwardText = defineComponentBinds('backwardText', vuetifyConfig)

const onSubmit = handleSubmit(async (values, actions) => {
  console.log(errors.value)
  try {
    await mutateAsync(values)
    actions.resetForm()
    router.back()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="px-4 py-2">
    <header class="d-flex w-100 justify-space-between align-center py-2">
      <h1>{{ t('createFlashcard.title') }}</h1>
    </header>
    <v-form @submit.prevent="onSubmit" class="d-flex flex-column align-center py-2 form">
      <div class="d-flex flex-column w-100">
        <label for="list-ids" class="text-h6 mb-2">{{ t('createFlashcard.listsLabel') }}</label>
        <TextField
          v-bind="listIDs"
          @change="reset()"
          :error-messages="listIDs['error-message']"
          id="list-ids"
          name="listIDs"
          :placeholder="t('createList.namePlaceholder')"
          class="w-100 list-name-input"
        />
      </div>
      <div class="d-flex flex-column w-100">
        <label for="forward-text" class="text-h6 mb-2">
          {{ t('createFlashcard.forwardLabel') }}
        </label>
        <Textarea
          v-bind="forwardText"
          @change="reset()"
          :error-messages="forwardText['error-message']"
          id="forward-text"
          name="forwardText"
          :placeholder="t('createList.namePlaceholder')"
          class="w-100 list-name-input"
        />
      </div>
      <div class="d-flex flex-column w-100">
        <label for="backward-text" class="text-h6 mb-2">
          {{ t('createFlashcard.backwardLabel') }}
        </label>
        <Textarea
          v-bind="backwardText"
          @change="reset()"
          :error-messages="backwardText['error-message']"
          id="backward-text"
          name="backwardText"
          :placeholder="t('createList.namePlaceholder')"
          class="w-100 list-name-input"
        />
      </div>
      <v-btn
        :disabled="!!Object.keys(errors).length"
        :loading="isLoading"
        type="submit"
        class="mt-2"
        >{{ t('createList.button') }}
      </v-btn>
    </v-form>
  </div>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 2px solid rgb(var(--v-theme-background-darken-1));
}

.form > * {
  max-width: 800px;
}

.list-name-input:deep() {
  & input {
    text-align: center;
  }

  & .v-messages__message {
    text-align: center;
  }
}
</style>
