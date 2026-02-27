export const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const MESSAGE_RESPONSE_DELAY = 1500
export const STATUS_CHANGE_INTERVAL = 10000
export const INITIAL_MESSAGES_COUNT = 25
export const MAX_MESSAGE_LENGTH = 1000

export const STORAGE_KEY = 'messenger_data'

export const AUTO_REPLY_TEXT = 'Спасибо за сообщение!)'

export const ERROR_MESSAGES = {
  FETCH_USERS_FAILED: 'Не удалось загрузить список пользователей',
  STORAGE_SAVE_FAILED: 'Не удалось сохранить данные',
  STORAGE_LOAD_FAILED: 'Не удалось загрузить данные'
}

export const SAMPLE_MESSAGES = [
  'Привет! Как дела?',
  'Что нового?',
  'Отлично!',
  'Хорошо, спасибо',
  'Давно не виделись',
  'Как погода?',
  'Увидимся позже',
  'Согласен',
  'Интересно',
  'Понятно'
]
