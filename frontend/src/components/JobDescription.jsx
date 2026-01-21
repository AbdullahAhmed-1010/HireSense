import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {

  const isApplied = false
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Fullstack Developer</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">8 Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
            <Badge className="text-[#7209B7] font-bold" variant="ghost">24LPA</Badge>
          </div>
        </div>
        <Button 
            disabled={isApplied} 
            className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209B7] hover:bg-[#5f32ad]"}`}>
            {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1">Job Role: <span className="font-normal text-gray-800 pl-2">Fullstack Developer</span></h1>
        <h1 className="font-bold my-1">Location: <span className="font-normal text-gray-800 pl-2">Bangalore</span></h1>
        <h1 className="font-bold my-1">Description: <span className="font-normal text-gray-800 pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur praesentium veritatis porro!</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="font-normal text-gray-800 pl-2">12LPA</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="font-normal text-gray-800 pl-2">2y</span></h1>
        <h1 className="font-bold my-1">Total Applicants: <span className="font-normal text-gray-800 pl-2">100</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="font-normal text-gray-800 pl-2">21-01-2026</span></h1>
      </div>
    </div>
  )
};

export default JobDescription;
