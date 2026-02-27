<template>
  <div class="messenger">
    <div 
      v-if="chatStore.isLoading" 
      class="messenger__loader"
    >
      <div class="spinner" />
      <p>Загрузка чатов...</p>
    </div>
    <div 
      v-if="chatStore.error" 
      class="messenger__error"
    >
      {{ chatStore.error }}
    </div>
    <template v-if="!chatStore.isLoading">
      <div class="messenger__sidebar">
        <ChatList
          :chats="chatStore.chats"
          :current-chat-id="chatStore.currentChatId"
          @select-chat="handleSelectChat"
        />
      </div>
      <div class="messenger__main">
        <ChatWindow
          :chat="chatStore.currentChat"
          @send="handleSendMessage"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'
import ChatList from '@/components/ChatList.vue'
import ChatWindow from '@/components/ChatWindow.vue'

const chatStore = useChatStore()
const router = useRouter()

onMounted(() => {
  chatStore.initChats()
})

const handleSelectChat = (chatId: number) => {
  chatStore.selectChat(chatId)
  
  if (window.innerWidth <= 768) {
    router.push(`/chat/${chatId}`)
  }
}

const handleSendMessage = (text: string) => {
  chatStore.sendMessage(text)
}
</script>

<style scoped lang="scss">
.messenger {
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative;

  &__loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: $color-background;

    p {
      margin-top: $spacing-lg;
      color: $color-text-placeholder;
      font-size: $font-size-base;
    }
  }

  &__error {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #f44336;
    color: $color-white;
    padding: $spacing-md $spacing-xl;
    border-radius: $spacing-sm;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &__sidebar {
    width: 360px;
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
  }
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid $color-border;
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: $breakpoint-mobile) {
  .messenger {
    &__sidebar {
      width: 100%;
    }

    &__main {
      display: none;
    }
  }
}
</style>
