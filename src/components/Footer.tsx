import React from 'react'
import '../styles/Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MyApp. Все права защищены.</p>
    </footer>
  )
}
export default Footer
