import { VuetifyOptions } from 'vuetify'

import darkTheme from './pallettes/darkTheme'
import lightTheme from './pallettes/lightTheme'

const theme: VuetifyOptions['theme'] = {
  defaultTheme: 'darkTheme',
  themes: {
    lightTheme,
    darkTheme
  }
}

export default theme
