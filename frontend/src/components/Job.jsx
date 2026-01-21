import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {

  const navigate = useNavigate()
  const jobId = "qwerty"

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-600">2 days ago</h3>
        <Button className="rounded-full" size="icon" variant="outline">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://t4.ftcdn.net/jpg/04/45/30/57/360_F_445305728_wbc77En8amG4xBkj8A0OsQcWWpZk3zbT.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor minima
          culpa, saepe accusamus vitae possimus commodi praesentium explicabo.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">8 Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
        <Badge className="text-[#7209B7] font-bold" variant="ghost">24LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${jobId}`)} variant="outline">Details</Button>
        <Button className="bg-blue-700 hover:bg-blue-800">Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;