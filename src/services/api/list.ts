import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

import type { GenericKeys } from '@/interfaces'
import type { CreateListForm } from '@/interfaces/list.interface'
import type { AxiosError } from 'axios'

import config from '@/config'

const LIST_API = `${config.API_URL}/list`

export function useCreateList() {
  return useMutation<string, AxiosError<GenericKeys>, CreateListForm>({
    mutationKey: ['list/create'],
    mutationFn: async (fields): Promise<string> => {
      const { data } = await axios.post(`${LIST_API}/create`, fields)

      return data
    }
  })
}
