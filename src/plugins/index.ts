/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import pinia from '@/store'
import type { App } from 'vue'

// Plugins
import { VueQueryPlugin } from '@tanstack/vue-query'

import i18n from './i18n'
import vuetify from './vuetify'
import { loadFonts } from './webfontloader'

import router from '@/router'

export function registerPlugins(app: App) {
  loadFonts()
  app.use(vuetify).use(router).use(pinia).use(VueQueryPlugin).use(i18n)
}
