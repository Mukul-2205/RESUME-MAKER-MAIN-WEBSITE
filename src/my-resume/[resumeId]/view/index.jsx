import { Button } from '@/components/ui/button'
import Header from '@/components/ui/custom/header'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'

function ViewResume() {

    const [resumeInfo, setResumeInfo]=useState();

    const {resumeId}=useParams();

    useEffect(()=>{
        GetResumeInfo()
    },[])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data)
        })
    }

    const HandleDownload=()=>{
        window.print();
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div id='no-print'>

        <Header/>
        <div className='my-10 mx-10 md:mx-20 lg:mx-30 '>
            <h2 className='text-center font-bold text-2xl'>
                Your resume is now ready!!!
            </h2>
            <p className='text-center font-medium'>
                Click the Download button to download your resume
            </p>
        </div>
        <div className='flex justify-center m-10'>
            <Button onClick={HandleDownload}>Download</Button>
        </div>
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-30 '>
            <div id='print-area' >
                <ResumePreview/>
            </div>
        </div>
        
        
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume