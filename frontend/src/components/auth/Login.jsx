import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email address" />
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
          </div>
          <Button className="w-full my-4 p-4 cursor-pointer" type="submit">Login</Button>
          <span className="text-sm">Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;