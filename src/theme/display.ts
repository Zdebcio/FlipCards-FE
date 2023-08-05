import { VuetifyOptions } from 'vuetify'

const display: VuetifyOptions['display'] = {
  mobileBreakpoint: 'lg',
  thresholds: {
    xs: 0,
    sm: 340,
    md: 540,
    lg: 800,
    xl: 1280,
    xxl: 1920
  }
}

export default display
