import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

import i18n from '@/plugins/i18n'

const t = i18n.global.t

export const createFlashcardSchema = toTypedSchema(
  zod.object({
    forwardText: zod
      .string({ required_error: t('validation.fieldRequired') })
      .trim()
      .nonempty(t('validation.fieldRequired'))
      .max(250, t('validation.tooLong', { max: 250 })),
    backwardText: zod
      .string({ required_error: t('validation.fieldRequired') })
      .trim()
      .nonempty(t('validation.fieldRequired'))
      .max(250, t('validation.tooLong', { max: 250 })),
    listIDs: zod
      .array(zod.string())
      .min(1, t('validation.minItems', { min: 1 }))
      .refine(items => new Set(items).size === items.length, {
        message: t('validation.unique')
      })
  })
)
