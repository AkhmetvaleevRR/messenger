import type { User } from '@/types'
import { API_URL, ERROR_MESSAGES } from '@/constants'

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const users: User[] = await response.json()
    return users.slice(0, 5)
  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_USERS_FAILED, error)
    throw new Error(ERROR_MESSAGES.FETCH_USERS_FAILED)
  }
}
