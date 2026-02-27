import type { Chat } from '@/types'
import { STORAGE_KEY, ERROR_MESSAGES } from '@/constants'

export const saveToStorage = (chats: Chat[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
  } catch (error) {
    console.error(ERROR_MESSAGES.STORAGE_SAVE_FAILED, error)
    throw new Error(ERROR_MESSAGES.STORAGE_SAVE_FAILED)
  }
}

export const loadFromStorage = (): Chat[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(ERROR_MESSAGES.STORAGE_LOAD_FAILED, error)
    return null
  }
}
