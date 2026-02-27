import type { Chat } from '@/types'
import { STORAGE_KEY } from '@/constants'

export const saveToStorage = (chats: Chat[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export const loadFromStorage = (): Chat[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Failed to load from localStorage:', error)
    return null
  }
}
