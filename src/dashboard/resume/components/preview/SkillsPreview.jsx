import React from 'react'

function SkillsPreview({resumeInfo}) {

    
  return (
    <div>
        <h2 className='text-center font-bold m-3'>
            Skills
        </h2>
        
        <div className='flex justify-between'>
           {resumeInfo?.attributes?.skills?.map((skill,index)=>(
            <div key={index} className='my-1 '> 
                {/* <h2 className='text-sm font-normal '>
                    {skill?.name}
                </h2> */}
                <div className='experience-preview-content' dangerouslySetInnerHTML={{__html:skill?.name}}/>

            </div>
        ))} 
        </div>
        
    </div>
  )
}

export default SkillsPreview