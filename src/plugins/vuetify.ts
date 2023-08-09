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

import defaults from '@/config/defaults'
import display from '@/config/display'
import theme from '@/config/theme'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults,
  display,
  theme,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
})
