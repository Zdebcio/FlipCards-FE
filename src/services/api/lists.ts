import { unref } from 'vue'

import axios from 'axios'
import Cookies from 'js-cookie'

import type {
  CreateListForm,
  GetUserLists,
  GetUserListsPayload,
  UserList
} from '@/interfaces/list.interface'

import config from '@/config'
import defaults from '@/config/defaults'

const LISTS_API = `${config.API_URL}/lists`

export const createList = async (fields: CreateListForm): Promise<string> => {
  const { data } = await axios.post(`${LISTS_API}/create`, fields, {
    headers: {
      Authorization: `Bearer ${Cookies.get('authToken')}`
    }
  })

  return data
}

export const getUserLists = async ({
  page = 0,
  name = '',
  limit = defaults.limit,
  skip
}: GetUserListsPayload): Promise<GetUserLists> => {
  const { data } = await axios.get(LISTS_API, {
    params: {
      name: unref(name),
      limit: unref(limit),
      skip: unref(skip) || defaults.limit * unref(page)
    },
    headers: {
      Authorization: `Bearer ${Cookies.get('authToken')}`
    }
  })

  return data
}

export const getList = async (listID?: string | string[]): Promise<UserList> => {
  const { data } = await axios.get(`${LISTS_API}/${listID}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('authToken')}`
    }
  })

  return data
}
