import type { Ref } from 'vue'

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

export function useGetInfiniteUserLists() {
  return useInfiniteQuery<GetUserLists, AxiosError<GenericKeys>>({
    queryKey: ['lists/getInfiniteUserLists'],
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

interface GetUserListsPayload {
  name?: Ref<string> | string
  limit?: Ref<string> | number
  skip?: Ref<string> | number
}

export function useGetUserLists({ name, limit, skip }: GetUserListsPayload) {
  return useQuery({
    queryKey: ['lists/getUserLists', name, limit, skip],
    queryFn: async ({ queryKey }): Promise<GetUserLists> => {
      const [, name, limit, skip] = queryKey

      const { data } = await axios.get(LISTS_API, {
        params: {
          name: name || '',
          limit: limit || defaults.limit,
          skip: skip || defaults.skip
        },
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        }
      })

      return data
    }
  })
}

export function useGetList(listID: string | string[]) {
  return useQuery<UserList, AxiosError<GenericKeys>>({
    queryKey: ['lists/getList'],
    queryFn: async (): Promise<UserList> => {
      const { data } = await axios.get(`${LISTS_API}/${listID}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        }
      })

      return data
    }
  })
}
