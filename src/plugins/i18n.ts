import { createI18n, type I18nOptions } from 'vue-i18n'

import messages from '@intlify/unplugin-vue-i18n/messages'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages as I18nOptions['messages']
})
