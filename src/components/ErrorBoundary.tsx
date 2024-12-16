import React, { ErrorInfo } from 'react'
import { toast } from 'react-toastify'
import '../styles/ErrorMessage.css'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Обновляем состояние, чтобы следующий рендер показал резервный UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логируем ошибку (можно отправить на сервер для анализа)
    console.error('Uncaught error:', error, errorInfo)
    // Отображаем уведомление об ошибке
    toast.error(`Произошла ошибка: ${error.message}`)
  }

  render() {
    if (this.state.hasError) {
      // Возвращаем стилизованное сообщение об ошибке
      return (
        <div className="error-message">
          <h1>Что-то пошло не так.</h1>
          <p>Пожалуйста, попробуйте позже или свяжитесь с поддержкой.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
