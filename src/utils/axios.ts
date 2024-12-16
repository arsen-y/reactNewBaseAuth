import axios from 'axios'
import { toast } from 'react-toastify'

// Создаём переменную для хранения функции logout
let logoutFunction: () => void = () => {}

// Функция для установки logout-функции из store
export const setLogout = (fn: () => void) => {
  logoutFunction = fn
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost/api'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

// Интерцепторы запросов
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Интерцепторы ответов
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status
      const data = error.response.data

      if (status === 401) {
        // Неавторизованный доступ, возможно, токен истёк
        toast.error('Сессия истекла. Пожалуйста, войдите снова.')
        logoutFunction()
      } else if (status === 400) {
        // Ошибки валидации или неправильные запросы
        const messages = Object.values(data).flat().join(' ')
        toast.error(messages || 'Неверный запрос.')
      } else if (status >= 500) {
        // Серверные ошибки
        toast.error('Произошла ошибка на сервере. Пожалуйста, попробуйте позже.')
      } else {
        // Другие ошибки
        toast.error(data.message || 'Произошла ошибка.')
      }
    } else if (error.request) {
      // Ошибка при отправке запроса
      toast.error('Не удалось отправить запрос. Проверьте ваше соединение с интернетом.')
    } else {
      // Другие ошибки
      toast.error('Произошла непредвиденная ошибка.')
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
