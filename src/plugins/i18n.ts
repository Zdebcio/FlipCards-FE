import { createI18n, type I18nOptions } from 'vue-i18n'

import messages from '@intlify/unplugin-vue-i18n/messages'

import { getItem } from '@/config/localStorage'
import { LOCAL_STORAGE } from '@/constants'

export default createI18n({
  legacy: false,
  locale: getItem(LOCAL_STORAGE.LANG) ?? navigator.language.split('-')[0],
  fallbackLocale: 'en',
  messages: messages as I18nOptions['messages']
})
