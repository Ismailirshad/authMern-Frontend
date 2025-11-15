import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import PasswordResetPage from './pages/PasswordResetPage'
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <>
    <ToastContainer />
   <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/reset-password' element={<PasswordResetPage />} />
    <Route path='/email-verify' element={<VerifyEmailPage />} />
   </Routes>
    </>
  )
}

export default App
