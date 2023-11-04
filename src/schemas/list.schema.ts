import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

import i18n from '@/plugins/i18n'

const t = i18n.global.t

export const listNameSchema = toTypedSchema(
  zod.object({
    name: zod
      .string({ required_error: t('validation.fieldRequired') })
      .nonempty(t('validation.fieldRequired'))
      .max(20, t('validation.tooLong', { max: 20 }))
  })
)
