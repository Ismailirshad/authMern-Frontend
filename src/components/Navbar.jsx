import React, { useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import LoginPage from '../pages/LoginPage';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      
      const res = await axios.post(backendUrl + '/api/auth/logout',{ withCredentials: true })
      res.data.success ? setIsLoggedIn(false) : toast.error(error.message)
      setUserData(null)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

     const res = await axios.post(backendUrl + '/api/auth/send-verify-otp',{ withCredentials: true});

      if (res.data.success) {
        navigate('/email-verify')
        toast.success(res.data.message)
      } else {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={'/logo.png'} alt="" className='w-28 sm:w-32' />
      {userData ?
        <div className='flex justify-center items-center w-8 h-8 rounded-full bg-black text-white relative  group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 right-0 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified &&
                <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>
              }
              <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
            </ul>
          </div>
        </div>
        :
        <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2
      text-gray-800 hover:bg-gray-100 transition-all'>
          Login
          <FaArrowRight className='w-4 h-4 text-black-500' />
        </button>
      }
    </div>
  )
}

export default Navbar
