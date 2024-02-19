import type { PaginationData } from '.'
import type { UserList } from './list.interface'

export interface Flashcard {
  _id: string
  forwardText: string
  backwardText: string
  userID: string
  createdAt: string
  updatedAt: string
}

export interface GetFlashcardsList extends PaginationData {
  data: Flashcard[]
}

export interface CreateFlashcardForm {
  forwardText: string
  backwardText: string
  lists: Pick<UserList, '_id' | 'name'>[]
}
