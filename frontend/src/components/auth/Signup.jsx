import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate()

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const changeFileHandler = (event) => {
    setInput({ ...input, file: event.target.files?.[0] });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if (input.file){
        formData.append("file", input.file)
    }
    try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials: true
        })
        if (res.data.success){
            navigate("/login")
            toast.success(res.data.message)
        }
    } catch (error){
        console.log(error)
        toast.error(error.response.data.message)
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email address"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  value="applicant"
                  type="radio"
                  name="role"
                  id="r1"
                  className="cursor-pointer"
                  checked={input.role === "applicant"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Applicant</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  value="recruiter"
                  type="radio"
                  name="role"
                  id="r2"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          <Button className="w-full my-4 p-4 cursor-pointer" type="submit">
            Signup
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;