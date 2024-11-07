import React from 'react'

function ExperiencePreview({resumeInfo}) {

    
  return (
    <div>
        <h2 className='text-center font-bold m-3'>
            Experience
        </h2>

        {resumeInfo?.attributes?.Experience?.map((experience,index)=>(
            <div key={index} className='my-5'> 
                <h2 className='text-sm font-bold'>
                    {experience?.title}
                </h2>

                <h2 className='text-sm flex justify-between'>
                    {experience?.companyName},{experience?.city},{experience?.state}
                    <span>
                        {experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate}
                    </span>
                </h2>
                {/* <p className='my-3'>
                    {experience?.workSummary}
                </p> */}
                <div className='experience-preview-content' dangerouslySetInnerHTML={{__html:experience?.workSummary}}/>

            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview