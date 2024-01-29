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
