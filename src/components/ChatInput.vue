<template>
  <div class="chat-input">
    <div class="chat-input__toolbar">
      <button
        class="chat-input__format-btn"
        @click="applyFormat('**')"
        title="Жирный (Ctrl+B)"
      >
        <strong>B</strong>
      </button>
      <button
        class="chat-input__format-btn"
        @click="applyFormat('*')"
        title="Курсив (Ctrl+I)"
      >
        <em>I</em>
      </button>
      <button
        class="chat-input__format-btn"
        @click="applyFormat('~~')"
        title="Зачеркнутый"
      >
        <s>S</s>
      </button>
    </div>
    <div class="chat-input__row">
      <textarea
        v-model="message"
        class="chat-input__field"
        placeholder="Введите сообщение..."
        rows="1"
        @keydown.enter.exact.prevent="send"
        @keydown.enter.shift.exact="addNewLine"
        @keydown.ctrl.b.prevent="applyFormat('**')"
        @keydown.ctrl.i.prevent="applyFormat('*')"
        @input="adjustHeight"
        ref="textarea"
      ></textarea>
      <button
        class="chat-input__button"
        :disabled="!message.trim()"
        @click="send"
      >
        Отправить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MAX_MESSAGE_LENGTH } from '@/constants'

const emit = defineEmits<{
  send: [text: string]
}>()

const message = ref<string>('')
const textarea = ref<HTMLTextAreaElement | null>(null)

const send = () => {
  const text = message.value.trim()
  if (!text || text.length > MAX_MESSAGE_LENGTH) return
  
  emit('send', text)
  message.value = ''
  resetHeight()
}

const addNewLine = (): void => {
  message.value += '\n'
}

const applyFormat = (symbol: string): void => {
  if (!textarea.value) return
  
  const start = textarea.value.selectionStart
  const end = textarea.value.selectionEnd
  const selectedText = message.value.substring(start, end)
  
  if (selectedText) {
    message.value = 
      message.value.substring(0, start) +
      symbol + selectedText + symbol +
      message.value.substring(end)
    
    textarea.value.focus()
    setTimeout(() => {
      if (textarea.value) {
        textarea.value.selectionStart = start + symbol.length
        textarea.value.selectionEnd = end + symbol.length
      }
    }, 0)
  } else {
    message.value = 
      message.value.substring(0, start) +
      symbol + symbol +
      message.value.substring(end)
    
    textarea.value.focus()
    setTimeout(() => {
      if (textarea.value) {
        textarea.value.selectionStart = start + symbol.length
        textarea.value.selectionEnd = start + symbol.length
      }
    }, 0)
  }
}

const adjustHeight = (): void => {
  if (!textarea.value) return
  textarea.value.style.height = 'auto'
  textarea.value.style.height = Math.min(textarea.value.scrollHeight, 120) + 'px'
}

const resetHeight = (): void => {
  if (!textarea.value) return
  textarea.value.style.height = 'auto'
}
</script>

<style scoped lang="scss">
.chat-input {
  &__toolbar {
    display: flex;
    gap: $spacing-xs;
    margin-bottom: $spacing-xs;
  }

  &__format-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid $color-border;
    border-radius: 6px;
    cursor: pointer;
    transition: all $transition-fast;
    font-size: 13px;
    color: $color-gray;

    &:hover {
      background: $color-background;
      border-color: $color-primary;
      color: $color-primary;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__row {
    display: flex;
    gap: $spacing-md;
    align-items: flex-end;
  }

  &__field {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    font-family: inherit;
    font-size: $font-size-base;
    resize: none;
    outline: none;
    transition: border-color $transition-fast;
    min-height: 40px;
    max-height: 120px;

    &:focus {
      border-color: $color-primary;
    }

    &::placeholder {
      color: $color-text-placeholder;
    }
  }

  &__button {
    padding: 10px $spacing-xl;
    background: $color-primary;
    color: $color-white;
    border: none;
    border-radius: $radius-md;
    font-size: $font-size-base;
    font-weight: 600;
    cursor: pointer;
    transition: background $transition-fast;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background: $color-primary-dark;
    }

    &:disabled {
      background: $color-disabled;
      cursor: not-allowed;
    }
  }
}
</style>
