<template>
  <div class="messenger">
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

  &__sidebar {
    width: 360px;
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
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
