import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constants'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'

const UpdateProfile = ({open, setOpen}) => {
  const [loading, setLoading] = useState(false)
  const {user} = useSelector(store => store.auth)

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    gender: user?.gender,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map(skill=>skill),
    file: user?.profile?.resume
  })

  const dispatch = useDispatch()

  const changeEventHandler = (event) => {
    setInput({...input, [event.target.name]:event.target.value})
  }

  const changeFileHandler = (event) => {
    const file = event.target.files?.[0]
    setInput({...input, file})
  }

  const submitHandler = async(event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("gender", input.gender)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills)
    if (input.file){
        formData.append("file", input.file)
    }

    try{
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        if (res.data.success){
            dispatch(setUser(res.data.user))
            toast.success(res.data.message)
        }
    } catch (error){
        console.log(error);
        toast.error(error.response.data.message)
    }
    setOpen(false)
    console.log(input);
  }

  return (
    <div>
        <Dialog open={open}>
            <DialogContent className="sm:max-w-106.25" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                            id="name"
                            name="fullname"
                            type="text"
                            value={input.fullname || ""}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email || ""}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="number" className="text-right">Phone Number</Label>
                            <Input
                            id="number"
                            name="phoneNumber"
                            type="number"
                            value={input.phoneNumber || ""}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="gender" className="text-right">Gender</Label>
                            <Input
                            id="gender"
                            name="gender"
                            type="text"
                            value={input.gender}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input
                            id="bio"
                            name="bio"
                            type="text"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Tech Stack</Label>
                            <Input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input
                            id="file"
                            name="file"
                            type="file"
                            onChange={changeFileHandler}
                            accept="application/pdf"
                            className="col-span-3 cursor-pointer"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading ? <Button className="w-full my-4 p-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait...</Button> : 
                            <Button className="w-full my-4 p-4 cursor-pointer" type="submit">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfile