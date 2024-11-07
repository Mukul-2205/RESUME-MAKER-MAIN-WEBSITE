import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import GlobalApi from '../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

function Education() {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ]);

    useEffect(() => {
        if (resumeInfo?.attributes?.education) {
            setEducationalList(resumeInfo.attributes.education);
        }
    }, [resumeInfo]);

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const newEntries = educationalList.slice();
        newEntries[index][name] = value;
        setEducationalList(newEntries);

        setResumeInfo(prev => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                education: newEntries,
            },
        }));
    };

    const addNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
    };

    const removeEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                education: educationalList.map(({ id, ...rest }) => rest)
            }
        };

        console.log(data);

        GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(res => {
            console.log(res);
            setLoading(false);
            toast('Details updated!');
        }).catch(error => {
            setLoading(false);
            console.error('Error updating details:', error);
        });
    };

    return (
        <div>
            <div className='p-4 shadow-lg border-primary border-[2px]'>
                <h2 className='font-bold text-lg'>Educational Details</h2>
                <p>Enter your educational details</p>
                <div>
                    {educationalList.map((item, index) => (
                        <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-2 mt-5'>
                            <div>
                                <label className='text-sm font-semibold'>University Name</label>
                                <Input
                                    name="universityName"
                                    value={item.universityName} // use value instead of defaultValue
                                    onChange={(event) => handleChange(event, index)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>Degree</label>
                                <Input
                                    name="degree"
                                    value={item.degree} // use value instead of defaultValue
                                    onChange={(event) => handleChange(event, index)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>Major</label>
                                <Input
                                    name="major"
                                    value={item.major} // use value instead of defaultValue
                                    onChange={(event) => handleChange(event, index)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>Start Date</label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    value={item.startDate} // use value instead of defaultValue
                                    onChange={(event) => handleChange(event, index)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>End Date</label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    value={item.endDate} // use value instead of defaultValue
                                    onChange={(event) => handleChange(event, index)}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>Description</label>
                                <Input
                                    name="description"
                                    value={item.description} // use value instead of defaultValue
                                    onChange={(event) => handleChange(event, index)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <Button variant="outline" onClick={addNewEducation}>+ Add More</Button>
                            <Button variant="outline" onClick={removeEducation}>- Remove</Button>
                        </div>
                        <div className='mt-3'>
                            <Button type="submit" disabled={loading} onClick={onSave}>
                                {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Education;
