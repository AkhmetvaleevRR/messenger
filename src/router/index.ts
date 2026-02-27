import { createRouter, createWebHistory } from 'vue-router'
import MessengerView from '@/views/MessengerView.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'messenger',
      component: MessengerView
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: ChatView
    }
  ]
})

export default router
