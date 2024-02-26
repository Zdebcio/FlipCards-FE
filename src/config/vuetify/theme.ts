import { type VuetifyOptions } from 'vuetify'

import { getItem } from '../localStorage'

import dark from './themes/dark'
import light from './themes/light'

import { LOCAL_STORAGE } from '@/constants'
import { Theme } from '@/interfaces'

const theme: VuetifyOptions['theme'] = {
  defaultTheme: getItem(LOCAL_STORAGE.THEME) === Theme.Dark ? Theme.Dark : Theme.Light,
  themes: {
    dark,
    light
  }
}

export default theme
