import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import Cookies from 'js-cookie'

import type { GenericKeys } from '@/interfaces'
import type { CreateListForm, GetUserLists, UserList } from '@/interfaces/list.interface'
import type { AxiosError } from 'axios'

import config from '@/config'
import defaults from '@/config/defaults'

const LISTS_API = `${config.API_URL}/lists`

export function useCreateList() {
  return useMutation<string, AxiosError<GenericKeys>, CreateListForm>({
    mutationKey: ['lists/create'],
    mutationFn: async (fields): Promise<string> => {
      const { data } = await axios.post(`${LISTS_API}/create`, fields, {
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
      const { data } = await axios.get(LISTS_API, {
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

export function useGetList(listID: string | string[]) {
  return useQuery<UserList, AxiosError<GenericKeys>>({
    queryKey: ['lists/getList'],
    queryFn: async ({ pageParam = 0 }): Promise<UserList> => {
      const { data } = await axios.get(`${LISTS_API}/${listID}`, {
        params: {
          skip: defaults.limit * pageParam,
          limit: defaults.limit
        },
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        }
      })

      return data
    }
  })
}
