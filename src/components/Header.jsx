import { useContext } from 'react'
import { AppContent } from '../context/AppContext';
import { Link } from 'react-router';

const Header = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className='flex flex-col mt-20 items-center text-center px-4 text-gray-800'>
      <img src="/Developer-logo.png" alt="Developer-logo"
        className='w-56 h-36 flex pr-5 rounded-full' />
      <h1 className='flex items-center text-xl sm:text-3xl'>Hey {userData ? userData.name : 'Developer'}
        <img className='w-30 h-20 aspect-square' src="/wave-logo.png" alt="handLogo" />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our App</h2>
      <p className='mb-8 max-w-md'>Lets starts with a quick tour and we will have you up and running in on time!</p>
      {!userData && (
        <Link to='/login'>
          <button className='border border-gray-500 rounded-full px-8 py-2.5 
      hover:bg-gray-100 transition-all'>Get Started</button>
        </Link>
      )}
    </div>
  )
}

export default Header
