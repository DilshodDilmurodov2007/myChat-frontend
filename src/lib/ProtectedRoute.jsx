import React from 'react'
import LoginPage from '../pages/LoginPage'

function ProtectedRoute({ children}) {
  return loggedIn ? children : <LoginPage />
}

export default ProtectedRoute