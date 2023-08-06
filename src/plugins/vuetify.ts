/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { useI18n } from 'vue-i18n'

import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

import i18n from './i18n'

import display from '@/theme/display'
import theme from '@/theme/theme'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme,
  display,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
})
