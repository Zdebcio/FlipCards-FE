import type { MaybeRef } from 'vue'

import type { PaginationData } from '.'

export interface CreateListForm {
  name: string
}

export interface UserList {
  _id: string
  name: string
  userID: string
  createdAt: string
  updatedAt: string
}

export interface GetUserLists extends PaginationData {
  data: UserList[]
}

export interface GetUserListsPayload {
  name?: MaybeRef<string>
  limit?: MaybeRef<number>
  skip?: MaybeRef<number>
  page?: MaybeRef<number>
}
