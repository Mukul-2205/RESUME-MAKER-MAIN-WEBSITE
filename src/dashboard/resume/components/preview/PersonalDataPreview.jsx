import React from 'react'

function PersonalDataPreview({resumeInfo}) {
  return (
    <div>
        <h2 className='font-bold text-xl text-center'>
            {resumeInfo?.attributes?.firstName} {resumeInfo?.attributes?.lastName}
        </h2>
        <h2 className='text-center text-sm font-normal'>
            {resumeInfo?.attributes?.jobTitle}
        </h2>
        <h2 className='text-center text-xs '>
            {resumeInfo?.attributes?.address}
        </h2>

        <div className='flex justify-between'>
            <h2 className='text-center text-xs '>
                {resumeInfo?.attributes?.phone}
            </h2>
            <h2 className='text-center text-xs '>
                {resumeInfo?.attributes?.email}
            </h2>
        </div>

        <hr className='border-[1px] my-5 border-black'/>
    </div>

    
  )
}

export default PersonalDataPreview