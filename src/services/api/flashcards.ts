import { useInfiniteQuery } from '@tanstack/vue-query'
import axios from 'axios'
import Cookies from 'js-cookie'

import type { GenericKeys } from '@/interfaces'
import type { GetFlashcardsList } from '@/interfaces/flashcard.interface'
import type { AxiosError } from 'axios'

import config from '@/config'
import defaults from '@/config/defaults'

const FLASHCARDS_API = `${config.API_URL}/flashcards`

export function useGetFlashcards(listID?: string | string[]) {
  return useInfiniteQuery<GetFlashcardsList, AxiosError<GenericKeys>>({
    queryKey: ['flashcards/getFlashcards'],
    queryFn: async ({ pageParam = 0 }): Promise<GetFlashcardsList> => {
      const { data } = await axios.get(FLASHCARDS_API, {
        params: {
          skip: defaults.limit * pageParam,
          limit: defaults.limit,
          listID: listID
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
