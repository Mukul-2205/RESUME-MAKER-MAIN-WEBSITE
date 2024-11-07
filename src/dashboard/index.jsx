import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItems from './components/ResumeCardItems';

function DashBoard() {
  const {user}=useUser();
  const [resumeList,setResumeList]=useState([])

  useEffect(()=>{
    user&&GetResumesList()
  },[user])


// use to get user's resume list
  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      console.log(resp.data.data)
      setResumeList(resp.data.data)
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Create new resume...</p> 
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        <AddResume/>
        {resumeList.length>0 && resumeList.map((resume,index)=>(
          <ResumeCardItems resume={resume} key={index} refreshData={GetResumesList}/>
        ))}
      </div>
    </div>
  )
}

export default DashBoard