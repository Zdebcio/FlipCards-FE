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

export interface GetUserLists {
  data: UserList[]
  count: number
  limit: number
  skip: number
}

export interface MainListDataItem {
  title: string
  subtitle?: string
  id: string
}

export interface MainLists {
  data: MainListDataItem[]
  count: number
  limit: number
  skip: number
}
