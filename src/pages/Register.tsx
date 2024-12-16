import React, { useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { registerUser } from '../redux/slices/authSlice'
import { Link } from 'react-router-dom'
import '../styles/Form.css'

const Register: React.FC = () => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  return (
    <div className="form-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
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
          Зарегистрироваться
        </button>
      </form>
      <Link to="/login" className="link">
        Уже есть аккаунт? Войти
      </Link>
    </div>
  )
}

export default Register
