import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState(false)
  const token = localStorage.getItem('token') // Или используйте Redux

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          MyApp
        </Link>
        <ul className={`nav-links ${isActive ? 'active' : ''}`}>
          {!token && (
            <li>
              <Link to="/login">Вход</Link>
            </li>
          )}
          {!token && (
            <li>
              <Link to="/register">Регистрация</Link>
            </li>
          )}
          {token && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          {token && (
            <li>
              <Link to="/logout">Выйти</Link>
            </li>
          )}
        </ul>
        <div className="burger" onClick={toggleMenu}>
          <div style={{ transform: isActive ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
          <div style={{ opacity: isActive ? 0 : 1 }}></div>
          <div style={{ transform: isActive ? 'rotate(-45deg) translate(7px, -6px)' : 'none' }}></div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
