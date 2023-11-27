import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'
import Cookies from 'js-cookie'

import type { GenericKeys } from '@/interfaces'
import type { CreateListForm } from '@/interfaces/list.interface'
import type { AxiosError } from 'axios'

import config from '@/config'

const LIST_API = `${config.API_URL}/lists`

export function useCreateList() {
  return useMutation<string, AxiosError<GenericKeys>, CreateListForm>({
    mutationKey: ['lists/create'],
    mutationFn: async (fields): Promise<string> => {
      const { data } = await axios.post(`${LIST_API}/create`, fields, {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        }
      })

      return data
    }
  })
}
