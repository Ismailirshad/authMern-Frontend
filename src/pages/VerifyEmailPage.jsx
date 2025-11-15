import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const VerifyEmailPage = () => {

  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);

  const navigate = useNavigate();

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const res = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
      if (res.data.success) {
        toast.success('Email verified successfully')
        await getUserData()
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate('/')
    }
  }, [isLoggedIn, userData])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0
     bg-gradient-to-br from-blue-200 to-purple-400 '>
      <img onClick={() => navigate('/')} src="logo.png" alt="" className='absolute left-5 sm:left-20 top-5 
      w-28 sm:w-32 cursor-pointer' />
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg w-96 text-sm flex flex-col items-center gap-3'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>
          Email Verify OTP</h1>
        <p className='text-center text-indigo-300'>Enter the 6 digit code sent to your Email ID</p>
        <div className='flex justify-center mb-8 gap-2' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder='0'
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl 
               rounded-md' type="text" maxLength='1' key={index} required />
          ))}
        </div>
        <button className='rounded-full  bg-gradient-to-r from-indigo-500
           to-indigo-900 p-3 w-1/2 font-semibold text-white hover:bg-transparent'>Submit</button>
      </form>


    </div>
  )
}
export default VerifyEmailPage
