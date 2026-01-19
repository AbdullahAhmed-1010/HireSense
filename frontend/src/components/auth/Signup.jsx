import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Enter your full name" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your valid email address" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="number" placeholder="Enter your phone number" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="text" placeholder="Enter your password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup defaultValue="default" className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="default" id="r1" className="cursor-pointer"/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="comfortable" id="r2" className="cursor-pointer"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                />
            </div>
          </div>
          <Button className="w-full my-4 p-4 cursor-pointer" type="submit">Signup</Button>
          <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;