import type { PaginationData } from '.'

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
