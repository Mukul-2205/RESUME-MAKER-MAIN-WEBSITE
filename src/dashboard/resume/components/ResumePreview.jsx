import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDataPreview from './preview/PersonalDataPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {
    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-[2px] border-black'>
        {/* personal details */}
        <PersonalDataPreview resumeInfo={resumeInfo}/>


        {/* summary */}

        {/* <SummaryPreview resumeInfo={resumeInfo}/> */}

        {/* Experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>

        {/* education */}
        <EducationalPreview resumeInfo={resumeInfo}/>

        {/* skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview