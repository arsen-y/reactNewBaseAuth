import React from 'react'
import { useAppDispatch } from '../redux/hooks'
import { logout } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axios'

const Logout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await axiosInstance.post('/logout')
      } catch (error) {
        console.error('Ошибка при выходе из системы:', error)
      }
    }
    dispatch(logout())
    navigate('/login')
  }

  return <button onClick={handleLogout}>Выйти</button>
}

export default Logout
