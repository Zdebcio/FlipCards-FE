<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { type PublicPathState, useForm } from 'vee-validate'

import type { UserList } from '@/interfaces/list.interface'

import AutocompleteField from '@/components/AutocompleteField.vue'
import Textarea from '@/components/Textarea.vue'
import { useCreateFlashcard, useGetList, useGetUserLists } from '@/hooks'
import router from '@/router'
import { createFlashcardSchema } from '@/schemas'

const { t } = useI18n()
const route = useRoute()

const autocompleteValue = ref('')

const { data: listData, isFetchedAfterMount } = useGetList(route.query.listID?.toString())
const { mutate, isLoading, isError, reset } = useCreateFlashcard()
const {
  data,
  isLoading: isListLoading,
  isInitialLoading
} = useGetUserLists({ name: autocompleteValue, limit: 5 })

const setInitialListData = (data: Ref<UserList> | Ref<undefined>) =>
  data.value ? [{ _id: data.value?._id, name: data.value?.name }] : []

const { defineComponentBinds, handleSubmit, errors, resetForm } = useForm({
  validationSchema: createFlashcardSchema,
  initialValues: {
    lists: setInitialListData(listData)
  }
})

watch([isFetchedAfterMount], () => {
  if (isFetchedAfterMount) {
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
  <div class="px-4 py-2">
    <header class="d-flex w-100 justify-space-between align-center py-2">
      <h1>{{ t('createFlashcard.title') }}</h1>
    </header>
    <v-form @submit.prevent="onSubmit" class="d-flex flex-column align-center py-2 form">
      <div class="d-flex flex-column w-100">
        <label for="list-ids" class="text-h6 mb-2">{{ t('createFlashcard.listsLabel') }}</label>
        <AutocompleteField
          :error-messages="lists['error-message']"
          :items="data?.data"
          :loading="isListLoading"
          :placeholder="t('createFlashcard.listsPlaceholder')"
          :search="autocompleteValue"
          @update:search="val => (autocompleteValue = val)"
          chips
          closable-chips
          id="list-ids"
          item-title="name"
          item-value="_id"
          return-object
          multiple
          name="lists"
          no-filter
          v-bind="lists"
        />
      </div>
      <div class="d-flex flex-column w-100">
        <label for="forward-text" class="text-h6 mb-2">
          {{ t('createFlashcard.forwardLabel') }}
        </label>
        <Textarea
          :error-messages="forwardText['error-message']"
          :placeholder="t('createFlashcard.forwardPlaceholder')"
          @change="reset()"
          class="w-100 list-name-input"
          id="forward-text"
          name="forwardText"
          v-bind="forwardText"
        />
      </div>
      <div class="d-flex flex-column w-100">
        <label for="backward-text" class="text-h6 mb-2">
          {{ t('createFlashcard.backwardLabel') }}
        </label>
        <Textarea
          :error-messages="backwardText['error-message']"
          :placeholder="t('createFlashcard.backwardPlaceholder')"
          @change="reset()"
          class="w-100 list-name-input"
          id="backward-text"
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
