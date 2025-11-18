
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { data, useNavigate } from 'react-router'
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';

const PasswordResetPage = () => {

  const { backendUrl } = useContext(AppContent);

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState(0);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      if (res.data.success) {
        toast.success ? toast.success(res.data.message) : toast.error(error.message)
        res.data.success && setIsEmailSent(true)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

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

 const onSubmitOtp = async (e) => {
  e.preventDefault();

  const otpArray = inputRefs.current
    .filter(item => item !== null) // ignore null refs
    .map(item => item.value || ""); // safely read value

  setOtp(otpArray.join(""));
  setIsOtpSubmitted(true);
};


  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword })
      if (res.data.success) {
        toast.success ? toast.success(res.data.message) : toast.error(error.message)
        res.data.success && navigate('/login')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 
     bg-gradient-to-br from-blue-200 to-purple-400 '>
      <img onClick={() => navigate('/')} src="logo.png" alt="logo" className='absolute left-5 sm:left-20 top-5 
      w-28 sm:w-32 cursor-pointer' />

      {!isEmailSent && (
        <form onSubmit={handleResetPassword} className='bg-slate-900 p-10 items-center flex flex-col  rounded-lg shadow-lg w-full sm:w-96
      text-indigo-300 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>
            Reset Password</h1>
          <p className='text-center text-indigo-300 pb-2'>Enter your registered email Id</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <MdEmail />
            <input onChange={e => setEmail(e.target.value)} required value={email} type="email" placeholder='Enter the Email' className='bg-transparent outline-none text-white' />
          </div>
          <button className='rounded-full  bg-gradient-to-r from-indigo-500
           to-indigo-900 p-3 w-1/2 font-semibold text-white hover:bg-transparent'>Submit</button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (

        <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg w-96 text-sm flex flex-col items-center gap-3'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>
            Reset Passowrd OTP</h1>
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
           to-indigo-900 p-2.5 w-1/2 font-semibold text-white hover:bg-transparent'>Submit</button>
        </form>
      )}
      {/* enter new Passowrd */}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-10 items-center flex flex-col  rounded-lg shadow-lg w-full sm:w-96
      text-indigo-300 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>
            Reset Password</h1>
          <p className='text-center text-indigo-300 pb-2'>Enter the new password</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <FaLock />
            <input onChange={e => setNewPassword(e.target.value)} required value={newPassword} type="password" placeholder='Enter the Passwprd' className='bg-transparent outline-none text-white' />
          </div>
          <button className='rounded-full  bg-gradient-to-r from-indigo-500
           to-indigo-900 p-3 w-1/2 font-semibold text-white hover:bg-transparent'>Submit</button>
        </form>
      )}
    </div>
  )
}

export default PasswordResetPage
