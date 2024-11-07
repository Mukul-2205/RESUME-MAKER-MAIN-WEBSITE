import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <p className='text-xs'>
        {resumeInfo?.summary}

        <hr className='border-[1px] border-black my-3'/>
    </p>
    
  )
}

export default SummaryPreview