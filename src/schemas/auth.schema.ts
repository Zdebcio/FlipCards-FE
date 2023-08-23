import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

import i18n from '@/plugins/i18n'

const t = i18n.global.t

export const loginSchema = toTypedSchema(
  zod.object({
    email: zod.string({ required_error: t('hello') }).nonempty(t('hello')),
    password: zod
      .string({ required_error: t('login.error.required') })
      .nonempty(t('login.error.required'))
  })
)
