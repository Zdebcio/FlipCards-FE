import { VuetifyOptions } from 'vuetify'

import darkTheme from './pallettes/darkTheme'
import lightTheme from './pallettes/lightTheme'

const theme: VuetifyOptions['theme'] = {
  defaultTheme: 'lightTheme',
  themes: {
    lightTheme,
    darkTheme
  }
}

export default theme
