import React from 'react'
import { useAppSelector } from '../redux/hooks'
import '../styles/Dashboard.css'

const Dashboard: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <p>Загрузка профиля...</p>
  }

  return (
    <div className="dashboard">
      <div className="profile-card">
        <h2>Профиль пользователя</h2>
        <div className="profile-details">
          <p>
            <strong>Имя:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Дата регистрации:</strong> {new Date(user.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
