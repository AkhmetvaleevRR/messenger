import type { Message } from '@/types'
import { SAMPLE_MESSAGES, INITIAL_MESSAGES_COUNT } from '@/constants'

export const generateMessageId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const generateInitialMessages = (chatId: number): Message[] => {
  const messages: Message[] = []
  const now = Date.now()
  const dayInMs = 86400000

  for (let i = 0; i < INITIAL_MESSAGES_COUNT; i++) {
    const isOwn = Math.random() > 0.5
    const text = SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)]
    
    messages.push({
      id: generateMessageId(),
      chatId,
      text,
      timestamp: now - (INITIAL_MESSAGES_COUNT - i) * (dayInMs / INITIAL_MESSAGES_COUNT),
      isOwn
    })
  }

  return messages
}

export const formatMessageTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const formatMessageDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Сегодня'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера'
  } else {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${day}.${month}.${date.getFullYear()}`
  }
}
