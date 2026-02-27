<template>
  <div class="chat-window">
    <div v-if="!chat" class="chat-window__empty">
      <p>Выберите чат для начала общения</p>
    </div>
    <template v-else>
      <div class="chat-window__header">
        <div class="chat-header">
          <div class="chat-header__avatar">
            <div class="avatar">{{ getInitials(chat.user.name) }}</div>
            <div class="status" :class="{ 'status--online': chat.isOnline }"></div>
          </div>
          <div class="chat-header__info">
            <h3>{{ chat.user.name }}</h3>
            <span class="chat-header__status">
              {{ chat.isOnline ? 'онлайн' : 'оффлайн' }}
            </span>
          </div>
        </div>
      </div>
      <div class="chat-window__messages" ref="messagesContainer">
        <div
          v-for="(message, index) in chat.messages"
          :key="message.id"
          class="message-wrapper"
        >
          <div
            v-if="shouldShowDate(index)"
            class="date-divider"
          >
            {{ formatDate(message.timestamp) }}
          </div>
          <div
            class="message"
            :class="{ 'message--own': message.isOwn }"
          >
            <div class="message__content">
              <div class="message__text" v-html="formatText(message.text)"></div>
              <div class="message__time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-window__input">
        <ChatInput @send="handleSend" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import type { Chat } from '@/types'
import { formatMessageTime, formatMessageDate } from '@/utils/messageUtils'
import { formatText } from '@/utils/textFormatter'
import ChatInput from './ChatInput.vue'

interface Props {
  chat: Chat | undefined
}

const props = defineProps<Props>()
const emit = defineEmits<{
  send: [text: string]
}>()

const messagesContainer = ref<HTMLElement | null>(null)

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatTime = (timestamp: number): string => {
  return formatMessageTime(timestamp)
}

const formatDate = (timestamp: number): string => {
  return formatMessageDate(timestamp)
}

const shouldShowDate = (index: number): boolean => {
  if (!props.chat) return false
  if (index === 0) return true
  
  const currentMsg = props.chat.messages[index]
  const prevMsg = props.chat.messages[index - 1]
  
  const currentDate = new Date(currentMsg.timestamp).toDateString()
  const prevDate = new Date(prevMsg.timestamp).toDateString()
  
  return currentDate !== prevDate
}

const handleSend = (text: string) => {
  emit('send', text)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

onMounted(() => {
  scrollToBottom()
})

watch(() => props.chat?.messages, () => {
  scrollToBottom()
}, { deep: true })

watch(() => props.chat?.id, () => {
  scrollToBottom()
})
</script>

<style scoped lang="scss">
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $color-background;

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: $color-text-placeholder;
    font-size: $font-size-lg;
  }

  &__header {
    background: $color-white;
    border-bottom: 1px solid $color-border;
    padding: $spacing-lg 20px;
  }

  &__messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }

  &__input {
    position: relative;
    z-index: 10;
    background: $color-white;
    border-top: 1px solid $color-border;
    padding: $spacing-lg 20px;
  }
}

.chat-header {
  display: flex;
  align-items: center;

  &__avatar {
    position: relative;
    margin-right: $spacing-md;
  }

  &__info {
    h3 {
      margin: 0 0 $spacing-xs 0;
      font-size: $font-size-lg;
      font-weight: 600;
    }
  }

  &__status {
    font-size: $font-size-base;
    color: $color-text-placeholder;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  font-size: 14px;
}

.status {
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
}

.date-divider {
  text-align: center;
  margin: 20px 0;
  color: $color-text-placeholder;
  font-size: 13px;
}

.message-wrapper {
  animation: fadeIn $transition-normal ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message {
  display: flex;
  margin-bottom: $spacing-md;

  &--own {
    justify-content: flex-end;

    .message__content {
      background: $color-primary;
      color: $color-white;
    }
  }

  &__content {
    max-width: 60%;
    padding: 10px 14px;
    background: $color-white;
    border-radius: $radius-sm;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &__text {
    word-wrap: break-word;
    margin-bottom: $spacing-xs;
    line-height: 1.4;
  }

  &__time {
    font-size: 11px;
    opacity: 0.7;
    text-align: right;
  }
}
</style>
