import { LoaderCircle, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '../../../service/GlobalApi'
import { toast } from 'sonner'


function ResumeCardItems({resume, refreshData}) {
    //console.log('resume=',resume.attributes.title)
    console.log(resume);
    
    const navigation=useNavigate();
    const [openAlert, setOpenAlert]=useState(false)
    const [loading, setLoading]=useState(false)
    const onDelete=()=>{
      setLoading(true)
      GlobalApi.DeleteResumeById(resume.id).then(resp=>{
        console.log(resp)
        toast("Resume Deleted!")
        refreshData()
        setLoading(false)
        setOpenAlert(false)
      },(error)=>{
        setLoading(false)
      })
    }
  return (
    
    <div>
        <Link to={'/dashboard/resume/'+resume.id+'/edit'}>
        
          <div className='p-14 mt-5 bg-secondary flex bg-gradient-to-t from-cyan-500 to-blue-500
          justify-center items-center h-[300px]
          border border-primary hover:scale-105 transition-all shadow-primary
          rounded' >
              {/* <Notebook/> */}
              <img src="/cv.png" width={80} height={80} alt="" />
          </div>
          
        </Link>
        <div className='border p-3 text-white flex justify-between ' style={{backgroundColor:'black'}}>
            <h2 className='text-sm'>
              {resume.attributes.title}  
            </h2>
              <DropdownMenu >
              <DropdownMenuTrigger style={{backgroundColor:'black'}}>
                <MoreVertical className='h-4 w-4 cursor-pointer bg-black'/>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
            
                <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.id+'/edit')} className='cursor-pointer'>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.id+'/view')} className='cursor-pointer'>View</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.id+'/view')} className='cursor-pointer'>Download</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <AlertDialog open={openAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} disabled={loading}>
                  {loading? <LoaderCircle className='animate-spin'/>:"Delete" }
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

            

        </div>
    </div>
    
    
  )
}

export default ResumeCardItems