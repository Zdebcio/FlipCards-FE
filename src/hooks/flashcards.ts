import { useInfiniteQuery, useMutation } from '@tanstack/vue-query'

import type { GetFlashcardsList } from '@/interfaces/flashcard.interface'

import { FLASHCARDS_KEYS } from '@/constants'
import { createFlashcard, deleteFlashcard, getFlashcards } from '@/services/api'

export function useGetFlashcards(listID?: string | string[]) {
  return useInfiniteQuery({
    queryKey: FLASHCARDS_KEYS.getFlashcards(listID),
    queryFn: async ({ pageParam = 0, queryKey }): Promise<GetFlashcardsList> =>
      await getFlashcards(pageParam, queryKey[1]),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.count > lastPage.skip + lastPage.limit) return pages.length
    }
  })
}

export function useCreateFlashcard() {
  return useMutation({
    mutationKey: FLASHCARDS_KEYS.createFlashcard,
    mutationFn: createFlashcard
  })
}

export function useDeleteFlashcard() {
  return useMutation({
    mutationKey: FLASHCARDS_KEYS.deleteFlashcard,
    mutationFn: deleteFlashcard
  })
}
