import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray =[]

const PostJob = () => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {companies} = useSelector(store => store.company)

    const changeHandler = (event) => {
        setInput({...input, [event.target.name]:event.target.value})
    }
    const selectHandler = (value) => {
        const selectedCompany = companies.find((company) => company?.name?.toLowerCase() === value)
        setInput({...input, companyId:selectedCompany?._id})
    }
    const submitHandler = async(event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials: true
            })
            if (res.data.success){
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error){
            console.log(error)
            toast.error(error.response.data.message)
        } finally{
            setLoading(false)
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center w-screen my-5'>
            <form onSubmit={submitHandler} action="" className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <Label>Title</Label>
                        <Input
                        type="text"
                        name="title"
                        placeholder=""
                        value={input.title}
                        onChange={changeHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                        type="text"
                        name="description"
                        placeholder=""
                        value={input.description}
                        onChange={changeHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input
                        type="text"
                        name="requirements"
                        placeholder=""
                        value={input.requirements}
                        onChange={changeHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                        type="text"
                        name="location"
                        placeholder=""
                        value={input.location}
                        onChange={changeHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input
                        type="text"
                        name="salary"
                        placeholder=""
                        value={input.salary}
                        onChange={changeHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input
                        type="text"
                        name="jobType"
                        placeholder=""
                        value={input.jobType}
                        onChange={changeHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input
                        type="text"
                        name="experience"
                        placeholder=""
                        value={input.experience}
                        onChange={changeHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Positions</Label>
                        <Input
                        type="number"
                        name="position"
                        placeholder=""
                        value={input.position}
                        onChange={changeHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>
                    {
                        companies?.length > 0 && (
                            <Select onValueChange={selectHandler}>
                                <SelectTrigger className="w-60">
                                    <SelectValue placeholder="select a company"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            companies?.map((company) => {
                                                return (
                                                    <SelectItem value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }
                </div>
                <div>
                    {
                        loading ? <Button className="w-full my-4 p-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait...</Button> : 
                        <Button className="w-full my-4 p-4 cursor-pointer" type="submit">Post</Button>
                    }
                </div>
                {
                    companies?.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first before posting any jobs!</p>
                }
            </form>
        </div>
    </div>
  )
}

export default PostJob