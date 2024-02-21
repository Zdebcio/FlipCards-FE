<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { type PublicPathState, useForm } from 'vee-validate'

import type { UserList } from '@/interfaces/list.interface'

import AutocompleteField from '@/components/AutocompleteField.vue'
import Textarea from '@/components/Textarea.vue'
import { useCreateFlashcard, useGetUserLists } from '@/hooks'
import router from '@/router'
import { createFlashcardSchema } from '@/schemas'

const { t } = useI18n()

const { listData, isListFetched } = defineProps<{ listData?: UserList; isListFetched: boolean }>()

const autocompleteValue = ref('')

const { mutate, isLoading, isError, reset } = useCreateFlashcard()
const {
  data,
  isLoading: isListLoading,
  isInitialLoading
} = useGetUserLists({ name: autocompleteValue, limit: 5 })

const setInitialListData = (data?: UserList) => (data ? [{ _id: data?._id, name: data?.name }] : [])

const { defineComponentBinds, handleSubmit, errors, resetForm } = useForm({
  validationSchema: createFlashcardSchema,
  initialValues: {
    lists: setInitialListData(listData)
  }
})

watch([isListFetched], () => {
  if (isListFetched) {
    resetForm({
      values: {
        lists: setInitialListData(listData)
      }
    })
  }
})

const vuetifyConfig = (state: PublicPathState) => ({
  props: {
    'error-message': state.errors[0]
  },
  validateOnValueUpdate: true
})

const lists = defineComponentBinds('lists', vuetifyConfig)
const forwardText = defineComponentBinds('forwardText', vuetifyConfig)
const backwardText = defineComponentBinds('backwardText', vuetifyConfig)

const onSubmit = handleSubmit(async (values, actions) => {
  mutate(values, {
    onSuccess: () => {
      actions.resetForm()
      router.back()
    }
  })
})
</script>

<template>
  <v-form @submit.prevent="onSubmit" class="d-flex flex-column align-center py-2 form">
    <div class="d-flex flex-column w-100">
      <AutocompleteField
        :error-messages="lists['error-message']"
        :items="data?.data"
        :label="t('createFlashcard.listsLabel')"
        :loading="isListLoading"
        :placeholder="t('createFlashcard.listsPlaceholder')"
        :search="autocompleteValue"
        @update:search="val => (autocompleteValue = val)"
        chips
        closable-chips
        id="list-ids"
        item-title="name"
        item-value="_id"
        multiple
        name="lists"
        no-filter
        return-object
        v-bind="lists"
      />
    </div>
    <div class="d-flex flex-column w-100">
      <Textarea
        :error-messages="forwardText['error-message']"
        :label="t('createFlashcard.forwardLabel')"
        :placeholder="t('createFlashcard.forwardPlaceholder')"
        @change="reset()"
        class="w-100"
        name="forwardText"
        v-bind="forwardText"
      />
    </div>
    <div class="d-flex flex-column w-100">
      <Textarea
        :error-messages="backwardText['error-message']"
        :label="t('createFlashcard.backwardLabel')"
        :placeholder="t('createFlashcard.backwardPlaceholder')"
        @change="reset()"
        class="w-100"
        name="backwardText"
        v-bind="backwardText"
      />
    </div>
    <v-alert
      :text="t('validation.otherSubtitle')"
      :title="t('validation.otherTitle')"
      border="start"
      class="w-100 mb-5"
      type="error"
      v-if="isError"
      variant="tonal"
    ></v-alert>
    <v-btn
      :disabled="!!Object.keys(errors).length"
      :loading="isLoading && !isInitialLoading"
      class="mt-2"
      type="submit"
    >
      {{ t('createList.button') }}
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
.form > * {
  max-width: 800px;
}
</style>
