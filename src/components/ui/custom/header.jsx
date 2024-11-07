import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
function Header() {
  const {user, isSignedIn}=useUser();
  return (
    <div className='py=3 px=3 flex justify-between shadow-md relative p-1'>
      <img src="/logo.svg" width={100} height={100}/>
      

      {
        isSignedIn ?
          <div className='flex gap-2 justify-center items-center '>
            
            <Link to={'/dashboard'}>
              <Button className='relative z-50'>Dashboard</Button>
            </Link>
            <div className='relative z-50'> <UserButton margin={2} /> </div>
          </div>:
          <Link to={'../auth/sign-in'}>
          <Button className='relative z-50'>
            start
          </Button>
        </Link>
      }
      
      
    </div>
  )
}

export default Header