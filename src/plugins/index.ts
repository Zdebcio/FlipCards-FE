/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'

// Plugins
import router from '../router'
import pinia from '../store'

import i18n from './i18n'
import vuetify from './vuetify'
import { loadFonts } from './webfontloader'

export function registerPlugins(app: App) {
  loadFonts()
  app.use(vuetify).use(router).use(pinia).use(i18n)
}
