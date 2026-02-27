export interface User {
  id: number
  name: string
}

export interface Message {
  id: string
  chatId: number
  text: string
  timestamp: number
  isOwn: boolean
}

export interface Chat {
  id: number
  user: User
  messages: Message[]
  isOnline: boolean
  lastMessage?: Message
  unreadCount: number
}
