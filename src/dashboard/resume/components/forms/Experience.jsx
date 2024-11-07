import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from '../../../../../service/GlobalApi';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
};

function Experience() {
    const [experienceList, setExperienceList] = useState([formField]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        if (resumeInfo?.attributes?.Experience) {
            setExperienceList(resumeInfo.attributes.Experience);
        }
    }, [resumeInfo]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...experienceList];
        newEntries[index][name] = value;
        setExperienceList(newEntries);

        setResumeInfo(prev => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                Experience: newEntries,
            },
        }));
    };

    
    const handleRichTextEditor = (newValue, name, index) => {
        console.log('Updating workSummary:', newValue); // Log the new value to debug
    
        const newEntries = [...experienceList]; // Clone current state
        newEntries[index][name] = newValue.target.value; // Update the specific entry's work summary
        setExperienceList(newEntries); // Update local state
    
        // Update resumeInfo in context
        setResumeInfo(prev => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                Experience: newEntries, // Ensure this structure is consistent
            },
        }));
    };
    

    
    
    
    

    const addExperienceList = () => {
        setExperienceList([...experienceList, { ...formField }]);
    };

    const removeExperienceList = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                Experience: experienceList.map(({ id, ...rest }) => rest),
            },
        };

        GlobalApi.UpdateResumeDetails(params?.resumeId, data)
            .then(res => {
                console.log(res);
                
                setLoading(false);
                toast('Details updated!');
            })
            .catch(error => {
                setLoading(false);
                console.error('Error updating details:', error);
            });
    };

    return (
        <div>
            <div className='p-4 shadow-lg border-primary border-[2px] '>
                <h2 className='font-bold text-lg '>Add Experience</h2>
                <p>Enter your previous work experience</p>

                <div>
                    {experienceList.map((item, index) => (

                        <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-2 mt-5'>
                            <div>
                                <label className='text-sm font-semibold'>Position Title</label>
                                <Input
                                    name="title"
                                    value={item.title}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>Company Name</label>
                                <Input
                                    name="companyName"
                                    value={item.companyName}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>City</label>
                                <Input
                                    name="city"
                                    value={item.city}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>State</label>
                                <Input
                                    name="state"
                                    value={item.state}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>Start Date</label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    value={item.startDate}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>End Date</label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    value={item.endDate}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </div>
                            <div className='col-span-2'>
                                <label className='text-sm font-semibold'>Work Summary</label>
                                <RichTextEditor 
                                    defaultValue={item?.workSummary || ''} // Ensure defaultValue is always a string
                                    onRichTextEditorChange={(newValue) => handleRichTextEditor(newValue, 'workSummary', index)} 
                                />


                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={addExperienceList}>+ Add More</Button>
                        <Button variant="outline" onClick={removeExperienceList}>- Remove</Button>
                    </div>
                    <div className='mt-3'>
                        <Button type="submit" disabled={loading} onClick={onSave}>
                            {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experience;
