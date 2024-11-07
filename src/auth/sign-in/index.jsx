import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className="flex justify-center min-h-screen items-center " >
        <SignIn/>
    </div>
    
  )
}

export default SignInPage