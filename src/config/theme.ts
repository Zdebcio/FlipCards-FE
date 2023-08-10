import { type VuetifyOptions } from 'vuetify'

import darkTheme from './themes/darkTheme'
import lightTheme from './themes/lightTheme'

const theme: VuetifyOptions['theme'] = {
  defaultTheme: 'lightTheme',
  themes: {
    lightTheme,
    darkTheme
  }
}

export default theme
