import { useInfiniteQuery, useMutation } from '@tanstack/vue-query'
import axios from 'axios'
import Cookies from 'js-cookie'

import type { GenericKeys } from '@/interfaces'
import type { CreateListForm, GetUserLists } from '@/interfaces/list.interface'
import type { AxiosError } from 'axios'

import config from '@/config'
import defaults from '@/config/defaults'

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

export function useGetUserLists() {
  return useInfiniteQuery<GetUserLists, AxiosError<GenericKeys>>({
    queryKey: ['lists/getUserLists'],
    queryFn: async ({ pageParam = 0 }): Promise<GetUserLists> => {
      const { data } = await axios.get(`${LIST_API}/user-lists`, {
        params: {
          skip: defaults.limit * pageParam,
          limit: defaults.limit
        },
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        }
      })

      return data
    },

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.count > lastPage.skip + lastPage.limit) return pages.length
    }
  })
}
