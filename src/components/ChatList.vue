<template>
  <div class="chat-list">
    <div class="chat-list__header">
      <h2>Чаты</h2>
    </div>
    <div class="chat-list__items">
      <div
        v-for="chat in chats"
        :key="chat.id"
        class="chat-item"
        :class="{ 'chat-item--active': chat.id === currentChatId }"
        @click="selectChat(chat.id)"
      >
        <div class="chat-item__avatar">
          <div class="avatar">
            {{ getInitials(chat.user.name) }}
          </div>
          <div 
            class="status" 
            :class="{ 'status--online': chat.isOnline }"
          />
        </div>
        <div class="chat-item__content">
          <div class="chat-item__header">
            <span class="chat-item__name">{{ chat.user.name }}</span>
            <span 
              v-if="lastMessage(chat)"
              class="chat-item__time"
            >
              {{ formatTime(lastMessage(chat)!.timestamp) }}
            </span>
          </div>
          <div class="chat-item__message">
            <span class="chat-item__text">{{ lastMessageText(chat) }}</span>
            <span 
              v-if="chat.unreadCount > 0" 
              class="chat-item__badge"
            >
              {{ chat.unreadCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Chat } from '@/types'
import { formatMessageTime } from '@/utils/messageUtils'

interface Props {
  chats: Chat[]
  currentChatId: number | null
}

defineProps<Props>()
const emit = defineEmits<{
  selectChat: [chatId: number]
}>()

const selectChat = (chatId: number) => {
  emit('selectChat', chatId)
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const lastMessage = (chat: Chat) => {
  return chat.messages[chat.messages.length - 1]
}

const lastMessageText = (chat: Chat): string => {
  const msg = lastMessage(chat)
  if (!msg) return 'Нет сообщений'
  const prefix = msg.isOwn ? 'Вы: ' : ''
  return prefix + (msg.text.length > 40 ? msg.text.slice(0, 40) + '...' : msg.text)
}

const formatTime = (timestamp: number): string => {
  return formatMessageTime(timestamp)
}
</script>

<style scoped lang="scss">
.chat-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $color-white;
  border-right: 1px solid $color-border;

  &__header {
    padding: 20px;
    border-bottom: 1px solid $color-border;

    h2 {
      margin: 0;
      font-size: $font-size-lg;
      font-weight: 600;
    }
  }

  &__items {
    flex: 1;
    overflow-y: auto;
  }
}

.chat-item {
  display: flex;
  padding: $spacing-md 20px;
  cursor: pointer;
  transition: background $transition-fast;

  &:hover {
    background: $color-background;
  }

  &--active {
    background: #e3f2fd;
  }

  &__avatar {
    position: relative;
    margin-right: $spacing-md;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-xs;
  }

  &__name {
    font-weight: 600;
    font-size: 15px;
  }

  &__time {
    font-size: $font-size-sm;
    color: $color-text-placeholder;
  }

  &__message {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__text {
    flex: 1;
    font-size: $font-size-base;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__badge {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    background: $color-primary;
    color: $color-white;
    border-radius: 10px;
    font-size: $font-size-sm;
    font-weight: 600;
    margin-left: $spacing-sm;
  }
}

.avatar {
  width: 48px;
  height: 48px;
  font-size: 16px;
}

.status {
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
}
</style>
