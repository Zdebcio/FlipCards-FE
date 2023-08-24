import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

import i18n from '@/plugins/i18n'
import { passwordReg } from '@/utils/regex'

const t = i18n.global.t

export const loginSchema = toTypedSchema(
  zod.object({
    email: zod
      .string({ required_error: t('validation.fieldRequired') })
      .nonempty(t('validation.fieldRequired')),
    password: zod
      .string({ required_error: t('validation.fieldRequired') })
      .nonempty(t('validation.fieldRequired'))
  })
)

export const registerSchema = toTypedSchema(
  zod
    .object({
      email: zod
        .string({ required_error: t('validation.fieldRequired') })
        .nonempty(t('validation.fieldRequired'))
        .email(t('validation.invalid_email')),
      password: zod
        .string({ required_error: t('validation.fieldRequired') })
        .nonempty(t('validation.fieldRequired'))
        .refine(value => {
          return passwordReg.test(value)
        }, t(`validation.weak_password`)),
      confirmPassword: zod
        .string({ required_error: t('validation.fieldRequired') })
        .nonempty(t('validation.fieldRequired'))
    })
    .refine(schema => schema.password === schema.confirmPassword, {
      message: t('validation.diff_password'),
      path: ['confirmPassword']
    })
)
