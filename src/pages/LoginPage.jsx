import React, { useContext, useState } from 'react'
import { FaLock, FaMailBulk, FaMailchimp, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md';
import { data, } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AppContent } from '../context/AppContext';

const LoginPage = () => {

  const navigate = useNavigate();

  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContent)

  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSave = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true

      if (state === "Sign Up") {
        const res = await axios.post(backendUrl + '/api/auth/register', { name, email, password })
        if (res.data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
          toast.success('Account created successfully')
        } else {
          toast.error(res.data.message || 'Registration failed')
        }
      } else {
        const res = await axios.post(backendUrl + '/api/auth/login', { email, password })
        if (res.data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
          toast.success('Logged in successfully')
        } else {
          toast.error(res.data.message || 'Login failed')
          console.log("login error", error)
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong');
    }

  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 '>
      <img onClick={() => navigate('/')} src="logo.png" alt="" className='absolute left-5 sm:left-20 top-5 
      w-28 sm:w-32 cursor-pointer' />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96
      text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold  text-white text-center mb-3' >{state === 'Sign Up' ? 'Create Account' : 'Login'} </h2>
        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'create your account' : 'Login to your account'} </p>

        <form onSubmit={handleSave}>
          {state !== "Login" && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
          rounded-full bg-[#333A5C]'>
            <FaUser />
            <input onChange={e => setName(e.target.value)} value={name} className='bg-transparent outline-none' placeholder='Enter Full Name' type="text" required />
          </div>)
          }
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
          rounded-full bg-[#333A5C]'>
            <MdEmail />
            <input onChange={e => setEmail(e.target.value)} value={email} className='bg-transparent outline-none' placeholder='Enter Email' type="email" required />
          </div>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
          rounded-full bg-[#333A5C]'>
            <FaLock />
            <input onChange={e => setPassword(e.target.value)} value={password} className='bg-transparent outline-none' placeholder='Enter Password' type="password" required />
          </div>

          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer text-center'>Forgot password ?</p>
          <button className='rounded-full py-2.5  w-full bg-gradient-to-r
          from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
        </form>

        {state == "Sign Up" ? (
          <p className='text-center text-sm mt-3'>Already have an account ?  <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'> Login here</span></p>
        ) : (
          <p className='text-center text-sm mt-3'>Dont have an account ?  <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'> Signup</span></p>
        )}

      </div>
    </div>
  )
}

export default LoginPage
