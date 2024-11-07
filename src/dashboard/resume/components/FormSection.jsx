import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Navigate, useParams } from 'react-router-dom'

function FormSection() {
  const [activeFormIndex, setActiveFormIndex]=useState(1)
  const [enableNext, setEnableNext]=useState(false);
  const {resumeId}=useParams();
  return (
    <div>
      <div className=' mb-2 flex justify-between items-center'>
        {activeFormIndex>1 && <Button className='flex gap-2 h-[35px]' onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/> Prev</Button>}
        
        <Button className='flex gap-2' size='sm' 
        onClick={()=>setActiveFormIndex(activeFormIndex+1)}
        disabled={!enableNext}
        >
          Next <ArrowRight/> 
        </Button>
        
      </div>
      {/* personal details */}
      {activeFormIndex==1? <PersonalDetails enabledNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==2? <Experience enabledNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==3? <Education  enabledNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==4? <Skills  enabledNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==5? <Navigate to={'/my-resume/'+resumeId+'/view'}/>
      :null}
    </div>
  )
}

export default FormSection