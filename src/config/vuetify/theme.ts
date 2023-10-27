import { type VuetifyOptions } from 'vuetify'

import { getItem } from '../localStorage'

import dark from './themes/dark'
import light from './themes/light'

import { Theme } from '@/interfaces'

const theme: VuetifyOptions['theme'] = {
  defaultTheme: getItem('theme') === Theme.Dark ? Theme.Dark : Theme.Light,
  themes: {
    dark,
    light
  }
}

export default theme
