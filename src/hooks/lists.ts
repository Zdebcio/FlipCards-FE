import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/vue-query'

import type { GenericKeys } from '@/interfaces'
import type {
  CreateListForm,
  GetUserLists,
  GetUserListsPayload,
  UserList
} from '@/interfaces/list.interface'
import type { AxiosError } from 'axios'

import { listsKeys } from '@/constants/queryKeys'
import { createList, getList, getUserLists } from '@/services/api'

export function useCreateList() {
  return useMutation<string, AxiosError<GenericKeys>, CreateListForm>({
    mutationKey: listsKeys.createList,
    mutationFn: createList
  })
}

export function useGetInfiniteUserLists() {
  return useInfiniteQuery<GetUserLists, AxiosError<GenericKeys>>({
    queryKey: listsKeys.getInfiniteUserLists,
    queryFn: async ({ pageParam = 0 }) => await getUserLists({ page: pageParam }),

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.count > lastPage.skip + lastPage.limit) return pages.length
    }
  })
}

export function useGetUserLists(payload: GetUserListsPayload) {
  return useQuery({
    queryKey: listsKeys.getUserLists(payload),
    queryFn: async ({ queryKey }): Promise<GetUserLists> => {
      const [, params] = queryKey
      const { name, limit, skip } = params as GetUserListsPayload

      return await getUserLists({ name, limit, skip })
    }
  })
}

export function useGetList(listID?: string | string[]) {
  return useQuery<UserList, AxiosError<GenericKeys>>({
    queryKey: listsKeys.getList(listID),
    queryFn: async () => await getList(listID),
    enabled: !!listID
  })
}
