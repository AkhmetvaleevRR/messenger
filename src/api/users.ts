import type { User } from '@/types'
import { API_URL } from '@/constants'

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  const users: User[] = await response.json()
  return users.slice(0, 5)
}
