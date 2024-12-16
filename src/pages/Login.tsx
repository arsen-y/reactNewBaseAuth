import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { loginUser } from '../redux/slices/authSlice'
import '../styles/Form.css' // Импорт стилей
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  return (
    <div className="form-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button">
          Войти
        </button>
      </form>
      <Link to="/register" className="link">
        Нет аккаунта? Зарегистрироваться
      </Link>
    </div>
  )
}

export default Login
