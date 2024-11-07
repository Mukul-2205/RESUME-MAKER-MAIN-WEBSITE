import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetails({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // Initialize formData with resumeInfo values if they exist
  useEffect(() => {
    if (resumeInfo?.attributes) {
      setFormData({
        firstName: resumeInfo.attributes.firstName || '',
        lastName: resumeInfo.attributes.lastName || '',
        jobTitle: resumeInfo.attributes.jobTitle || '',
        address: resumeInfo.attributes.address || '',
        phone: resumeInfo.attributes.phone || '',
        email: resumeInfo.attributes.email || '',
      });
    }
  }, [resumeInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    enabledNext(false);

    // Update formData with new input values
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Update resumeInfo in context to reflect real-time changes
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      attributes: {
        ...prevResumeInfo?.attributes,
        [name]: value,
      },
    }));
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { data: formData };
    console.log(resumeInfo);
    
    GlobalApi.UpdateResumeDetails(params?.resumeId, data)
      .then((resp) => {
        enabledNext(true);
        setLoading(false);
        toast("Details Updated!");
      })
      .catch((error) => {
        console.error("Error updating details:", error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4 shadow-lg border-primary border-[2px]">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Enter your personal details</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-2">
          <div>
            <label className="text-sm font-semibold">First Name</label>
            <Input
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Last Name</label>
            <Input
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-semibold">Job Title</label>
            <Input
              name="jobTitle"
              required
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-semibold">Address</label>
            <Input
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Phone No.</label>
            <Input
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Email ID</label>
            <Input
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-3">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
