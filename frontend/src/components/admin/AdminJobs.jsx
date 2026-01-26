import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAdminJobs from '@/hooks/useGetAdminJobs'
import { setSearchJob } from '@/redux/jobSlice'

const AdminJobs = () => {

  useGetAdminJobs()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJob(input))
  }, [input])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input
                className="w-fit"
                placeholder="filter by name or role"
                onChange={(event) => setInput(event.target.value)}
                />
                <Button onClick={() => navigate("/admin/jobs/create")}>New Job</Button>
            </div>
            <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs