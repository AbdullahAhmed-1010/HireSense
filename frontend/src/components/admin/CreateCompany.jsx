import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import store from '@/redux/store'

const CreateCompany = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {company} = useSelector(store => store.company)

    const [input, setInput] = useState({
        name: company?.name || "",
        description: company?.description || "",
        location: company?.location || "",
        website: company?.website || ""
    })

    const handleChange = (event) => {
        setInput({...input, [event.target.name]: event.target.value})
    }

    const registerCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, 
            {
               companyName: input?.name,
               description: input?.description,
               location: input?.location,
               companyWebsite: input?.website
            }, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials: true
            })
            if (res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error){
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Register a <span className='text-[#6A38C2]'>New Company</span></h1>
                <p className='text-gray-500'>What would you like to name your company? <span>You can change this later!</span></p>
            </div>
            <div>
                <Label>Company Name</Label>
                <Input
                type="text"
                name="name"
                className="my-2"
                placeholder="Google, Microsoft, Azure, etc"
                onChange={handleChange}
                />
            </div>
            <div>
                <Label>Company Description</Label>
                <Input
                type="text"
                name="description"
                className="my-2"
                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, eligendi."
                onChange={handleChange}
                />
            </div>
            <div>
                <Label>Company Location</Label>
                <Input
                type="text"
                name="location"
                className="my-2"
                placeholder="Kolkata, Bangalore, Pune, etc"
                onChange={handleChange}
                />
            </div>
            <div>
                <Label>Company Website</Label>
                <Input
                type="text"
                name="website"
                className="my-2"
                placeholder="www.<company-name>.com"
                onChange={handleChange}
                />
            </div>
            <div className='flex items-center gap-2 my-10'>
                <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                <Button onClick={registerCompany}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CreateCompany