import { type VuetifyOptions } from 'vuetify'

const defaults: VuetifyOptions['defaults'] = {
  VTextField: {
    color: 'primary',
    baseColor: 'primary',
    variant: 'outlined'
  },
  VTextarea: {
    color: 'primary',
    baseColor: 'primary',
    variant: 'outlined'
  },
  VAutocomplete: {
    color: 'primary',
    baseColor: 'primary',
    variant: 'outlined'
  },

  // Buttons
  VBtn: {
    color: 'primary',
    density: 'comfortable',
    size: 'large',
    variant: 'flat',
    class: ['px-10', 'py-1', 'h-auto', 'w-auto'],
    rounded: 'lg'
  },
  VBtnText: {
    color: 'primary',
    density: 'comfortable',
    size: 'large',
    variant: 'text',
    class: ['px-1', 'tt-none'],
    rounded: 'lg'
  },
  VBtnIcon: {
    color: 'primary',
    density: 'comfortable',
    size: 'large',
    variant: 'elevated',
    icon: true,
    ripple: true
  }
}

export default defaults
