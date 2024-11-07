import React from 'react'

function EducationalPreview({resumeInfo}) {

    
  return (
    <div>
        <h2 className='text-center font-bold m-3'>
            Education
        </h2>

        {resumeInfo?.attributes?.education?.map((edu,index)=>(
            <div key={index} className='my-5'> 
                <h2 className='text-sm font-bold'>
                    {edu.universityName}
                </h2>

                <h2 className='text-sm flex justify-between'>
                    {edu?.degree} in {edu?.major}
                    <span>
                        {edu?.startDate} - {edu?.endDate}
                    </span>
                </h2>
                <p className='my-3'>
                    {edu?.description}
                </p>

            </div>
        ))}
    </div>
  )
}

export default EducationalPreview