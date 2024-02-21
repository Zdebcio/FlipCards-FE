import { useInfiniteQuery, useMutation } from '@tanstack/vue-query'

import type { GetFlashcardsList } from '@/interfaces/flashcard.interface'

import { flashcardsKeys } from '@/constants/queryKeys'
import { createFlashcard, getFlashcards } from '@/services/api'

export function useGetFlashcards(listID?: string | string[]) {
  return useInfiniteQuery({
    queryKey: flashcardsKeys.getFlashcards(listID),
    queryFn: async ({ pageParam = 0, queryKey }): Promise<GetFlashcardsList> =>
      await getFlashcards(pageParam, queryKey[1]),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.count > lastPage.skip + lastPage.limit) return pages.length
    }
  })
}

export function useCreateFlashcard() {
  return useMutation({
    mutationKey: flashcardsKeys.createFlashcard,
    mutationFn: createFlashcard
  })
}
