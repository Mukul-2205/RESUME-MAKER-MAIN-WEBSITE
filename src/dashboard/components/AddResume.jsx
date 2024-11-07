import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../../service/GlobalApi'
import { useNavigate } from 'react-router-dom'


function AddResume() {
    const [openDialog, setOpenDialog]=useState(false);
    const [resumeTitle, setResumeTitle]=useState();
    const {user}=useUser();
    const [loading, setLoading]=useState(false)
    const navigation=useNavigate();
    const onCreate=()=>{
        setLoading(true)
        const uuid=uuidv4();
        const data={
            data:{
                title:resumeTitle,
                resumeId:uuid,
                userEmail:user?.primaryEmailAddress.emailAddress,
                userName:user?.fullName
            }

        }
        
        GlobalApi.CreateNewResume(data).then(resp=>{
            console.log(resp)
            if(resp){
                setLoading(false)
                navigation('/dashboard/resume/'+resp.data.data.id+'/edit')
            }
        },(error)=>{
            setLoading(false)
        })

    }
  return (
    <div>
        <div className='mt-5 p-14 py-24 border items-center 
        flex justify-center bg-secondary
        h-[300px] hover:scale-185 transition-all hover:shadow-md
        cursor-pointer border-dashed'
        onClick={()=> setOpenDialog(true)}>
            <PlusSquare/>
        </div>
        <Dialog open={openDialog}>
        
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
                <p>Add title for the resume</p>
               <Input className='mt-2' placeholder="For example - Full Stack Developer"
               onChange={(e)=>setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className='flex justify-end gap-3'>
                <Button variant="ghost" onClick={()=> setOpenDialog(false)}>Cancel</Button>
                <Button disabled={!resumeTitle || loading}
                onClick={()=>onCreate()}>
                    {
                        loading?<Loader2 className='animate-spin'/>:'Create'
                    }
                </Button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddResume