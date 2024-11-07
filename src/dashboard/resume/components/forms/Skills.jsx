import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { toast } from 'sonner'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

function Skills() {
    const [skillsList, setSkillsList] = useState([{ name: '' }])
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)
    const params = useParams()

    useEffect(() => {
        // Only set skillsList if skills data is available in resumeInfo
        if (resumeInfo?.attributes?.skills?.length > 0) {
            setSkillsList(resumeInfo.attributes.skills)
        } else {
            setSkillsList([{ name: '' }])  // Ensure RichTextEditor is always visible
        }
    }, [resumeInfo])

    // Sync skillsList to resumeInfo whenever skillsList changes
    

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...skillsList]
        newEntries[index][name] = e.target.value
        setSkillsList(newEntries)
        setResumeInfo(prev => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                skills: newEntries,
            },
        }));
    }

    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest),
            },
        }
        GlobalApi.UpdateResumeDetails(params?.resumeId, data)
            
            .then((res) => {
                console.log(res);
                setLoading(false)
                toast('Skills updated successfully!')
            })
            .catch((error) => {
                setLoading(false)
                toast.error('Failed to update skills')
                console.error(error)
            })
    }

    return (
        <div>
            <div className='p-4 shadow-lg border-primary border-[2px]'>
                <h2 className='font-bold text-lg'>Add Skills</h2>
                <p>Enter your skills</p>
                <div>
                    {skillsList.map((skill, index) => (
                        <div key={index} className='my-3'>
                            <RichTextEditor
                                defaultValue={skill?.name}
                                onRichTextEditorChange={(event) => handleRichTextEditor(event, 'name', index)}
                            />
                        </div>
                    ))}
                </div>
                <div className='flex justify-between mt-4'>
                    <Button onClick={onSave} disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Skills
