import type { GetUserListsPayload } from '@/interfaces/list.interface'

export const AUTH_KEYS = {
  loginUser: ['auth/login'] as const,
  registerUser: ['auth/register'] as const
}

export const FLASHCARDS_KEYS = {
  createFlashcard: ['flashcards/create'] as const,
  deleteFlashcard: ['flashcards/delete'] as const,
  getFlashcards: (listID?: string | string[]) => ['flashcards/getFlashcards', listID] as const
}

export const LISTS_KEYS = {
  createList: ['lists/create'] as const,
  getInfiniteUserLists: ['lists/getInfiniteUserLists'] as const,
  getList: (listID?: string | string[]) => ['lists/getList', listID] as const,
  getUserLists: (filters: GetUserListsPayload) => ['lists/getUserLists', filters] as const
}
