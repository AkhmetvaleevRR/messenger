import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Chat, Message } from '@/types'
import { fetchUsers } from '@/api/users'
import { generateInitialMessages, generateMessageId } from '@/utils/messageUtils'
import { saveToStorage, loadFromStorage } from '@/utils/storageUtils'
import { MESSAGE_RESPONSE_DELAY, AUTO_REPLY_TEXT, STATUS_CHANGE_INTERVAL } from '@/constants'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])
  const currentChatId = ref<number | null>(null)
  const isLoading = ref(false)

  const currentChat = computed(() => 
    chats.value.find(chat => chat.id === currentChatId.value)
  )

  const initChats = async () => {
    isLoading.value = true
    try {
      const savedChats = loadFromStorage()
      
      if (savedChats && savedChats.length > 0) {
        chats.value = savedChats
      } else {
        const users = await fetchUsers()
        chats.value = users.map(user => ({
          id: user.id,
          user,
          messages: generateInitialMessages(user.id),
          isOnline: Math.random() > 0.5,
          unreadCount: 0
        }))
        saveToStorage(chats.value)
      }
      
      setInterval(() => {
        chats.value.forEach(chat => {
          if (Math.random() > 0.7) chat.isOnline = !chat.isOnline
        })
        saveToStorage(chats.value)
      }, STATUS_CHANGE_INTERVAL)
    } catch (error) {
      console.error('Failed to initialize chats:', error)
    } finally {
      isLoading.value = false
    }
  }

  const selectChat = (chatId: number) => {
    currentChatId.value = chatId
    const chat = chats.value.find(c => c.id === chatId)
    if (chat) {
      chat.unreadCount = 0
      saveToStorage(chats.value)
    }
  }

  const sendMessage = (text: string) => {
    if (!currentChatId.value || !text.trim()) return

    const chat = chats.value.find(c => c.id === currentChatId.value)
    if (!chat) return

    const message: Message = {
      id: generateMessageId(),
      chatId: currentChatId.value,
      text: text.trim(),
      timestamp: Date.now(),
      isOwn: true
    }

    chat.messages.push(message)
    saveToStorage(chats.value)

    const chatIdWhenSent = currentChatId.value
    setTimeout(() => {
      const chat = chats.value.find(c => c.id === chatIdWhenSent)
      if (!chat) return

      chat.messages.push({
        id: generateMessageId(),
        chatId: chatIdWhenSent,
        text: AUTO_REPLY_TEXT,
        timestamp: Date.now(),
        isOwn: false
      })
      
      if (currentChatId.value !== chatIdWhenSent) chat.unreadCount++
      saveToStorage(chats.value)
    }, MESSAGE_RESPONSE_DELAY)
  }

  return {
    chats,
    currentChatId,
    currentChat,
    isLoading,
    initChats,
    selectChat,
    sendMessage
  }
})
