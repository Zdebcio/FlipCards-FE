import axios from 'axios'
import Cookies from 'js-cookie'

import type { CreateFlashcardForm, DeleteFlashcardPayload } from '@/interfaces/flashcard.interface'

import config from '@/config'
import defaults from '@/config/defaults'

const FLASHCARDS_API = `${config.API_URL}/flashcards`

export const getFlashcards = async (pageParam: number, listID?: string | string[]) => {
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
}

export const createFlashcard = async (fields: CreateFlashcardForm): Promise<string> => {
  const { data } = await axios.post(
    `${FLASHCARDS_API}/create`,
    { listIDs: fields.lists.map(({ _id }) => _id), ...fields },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`
      }
    }
  )

  return data
}

export const deleteFlashcard = async ({
  listID,
  flashcardID
}: DeleteFlashcardPayload): Promise<null> => {
  const { data } = await axios.delete(
    `${FLASHCARDS_API}/delete/list/${listID}/flashcard/${flashcardID}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`
      }
    }
  )

  return data
}
