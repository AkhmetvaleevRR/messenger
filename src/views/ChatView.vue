<template>
  <div class="mobile-chat">
    <div 
      class="mobile-chat__back" 
      @click="goBack"
    >
      <span>← Назад</span>
    </div>
    <div class="mobile-chat__content">
      <ChatWindow
        :chat="chatStore.currentChat"
        @send="handleSendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'
import ChatWindow from '@/components/ChatWindow.vue'

const chatStore = useChatStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  if (window.innerWidth > 768) {
    router.push('/')
    return
  }
  
  await chatStore.initChats()
  const chatId = Number(route.params.id)
  if (chatId) {
    chatStore.selectChat(chatId)
  }
})

const goBack = () => {
  router.push('/')
}

const handleSendMessage = (text: string) => {
  chatStore.sendMessage(text)
}
</script>

<style scoped lang="scss">
.mobile-chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  &__back {
    flex-shrink: 0;
    padding: $spacing-lg 20px;
    background: $color-white;
    border-bottom: 1px solid $color-border;
    cursor: pointer;
    font-weight: 600;
    color: $color-primary;

    &:hover {
      background: $color-background;
    }
  }

  &__content {
    flex: 1;
    overflow: hidden;
  }
}

@media (min-width: 769px) {
  .mobile-chat {
    display: none;
  }
}
</style>
