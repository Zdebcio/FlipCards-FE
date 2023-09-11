import { type VuetifyOptions } from 'vuetify'

const display: VuetifyOptions['display'] = {
  mobileBreakpoint: 'xl',
  thresholds: {
    xs: 0,
    sm: 360,
    md: 540,
    lg: 800,
    xl: 1280,
    xxl: 1920
  }
}

export default display
