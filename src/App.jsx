import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useEffect, useState } from 'react'
import { useAuthStore } from './store/useAuthStore'
import PageLoader from './components/PageLoader'
import NotAvailable from './pages/NotAvailable'
import { Toaster } from 'react-hot-toast';
import { useChatStore } from './store/useChatStore'


function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />;
  
  return (
      <div className='min-h-screen bg-gray-950 relative flex items-center justify-center overflow-hidden'>
          <Toaster />
        {/* Decorators */}
       <div className='absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]' />
        <div className='absolute bottom-0 -right-4 size-96 bg-blue-500 opacity-20 blur-[100px]' />
         <Routes>
           <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
           <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
           <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
           <Route path="*" element={<NotAvailable />} />
       </Routes>
      </div>
  )
}

export default App