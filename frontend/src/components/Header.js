import React, { useEffect, useState } from 'react'
import LOGO from '../assets/logo.jpeg';
import Profile from './profile/Profile';


const Header = () => {
  const [profile, setProfile] = useState(false);

  const openProfile = () => {
    setProfile(!profile);
  }
  return (
    <div className=' relative items-center p-2 bg-blue-300 '>
      <img onClick={openProfile} className='w-8   overflow-hidden rounded-lg' src={LOGO} alt="logo" />
      {profile && (
        <div className='absolute z-10 h-screen top-0 shadow-lg left-0 bottom-0 bg-blue-100 rounded-md p-2 py-4 w-60  'style={{transition:'0.5s'}}>
          <Profile setProfile={setProfile} />
        </div>
      )}
      
    </div>
  )
}

export default Header