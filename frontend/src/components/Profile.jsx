import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Baby, Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobs from "./AppliedJobs";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const isResume = true

const Profile = () => {

  const [open, setOpen] = useState(false)
  const {user} = useSelector(store => store.auth)
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-100 rounded-2xl my-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://t4.ftcdn.net/jpg/04/45/30/57/360_F_445305728_wbc77En8amG4xBkj8A0OsQcWWpZk3zbT.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl mb-1">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="text-right">
            <Pen />
          </Button>
        </div>
        <div>
            <div className="flex items-center gap-3 my-2 mt-4">
                <Mail/>
                <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
                <Contact/>
                <span>{user?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
                <Baby/>
                <span>{user?.gender || "Male"}</span>
            </div>
        </div>
        <div className="my-5">
            <h1 className="font-bold text-md mb-1">Tech Stack</h1>
            <div className="flex items-center gap-1">
              {
                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (<Badge key={index}>{item}</Badge>)) : (<span>Not Applicable!</span>)
              }
            </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume ? <a href={user?.profile?.resume} target="blank" className="font-semibold text-blue-500 w-full hover:underline cursor-pointer">resume.pdf</a> : (<span>Not Applicable!</span>)
          }
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobs/>
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;