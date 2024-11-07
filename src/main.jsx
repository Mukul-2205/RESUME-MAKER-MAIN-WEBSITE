import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import HomePage from './home/index.jsx'
import DashBoard from './dashboard/index.jsx'
import {ClerkProvider} from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


const router=createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path:'/dashboard',
        element:<DashBoard />
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      }
    ]
  },
  {
    path:'/',
    element: <HomePage/>
  },

  {
    path:'/auth/sign-in',
    element: <SignInPage/>
  },
  {
    path:'/my-resume/:resumeId/view',
    element: <ViewResume/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router}/>
    </ClerkProvider>
    
  </StrictMode>,
)
