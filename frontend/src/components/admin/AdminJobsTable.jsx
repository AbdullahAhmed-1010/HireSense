import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {

  const { adminJobs, searchJob } = useSelector(store => store.job)
  const [filterJob, setFilterJob] = useState([adminJobs])
  const navigate = useNavigate()
  console.log("adminJobs:", adminJobs);
  console.log("isArray:", Array.isArray(adminJobs));

  useEffect(() => {
    if (!Array.isArray(adminJobs)){
        setFilterJob([])
        return
    }
    const filteredJob = adminJobs.filter((job) => {
        if (!searchJob){
            return true
        }
        return job?.title?.toLowerCase()?.includes(searchJob?.toLowerCase()) || 
        job?.location?.toLowerCase()?.includes(searchJob?.toLowerCase()) ||
        job?.company?.name?.toLowerCase()?.includes(searchJob?.toLowerCase())
    })
    setFilterJob(filteredJob)
  }, [adminJobs, searchJob])
  return (
    <div>
      <Table>
        <TableCaption>List of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob?.map((job) => (
            <TableRow>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.location}</TableCell>
              <TableCell>{job?.jobType}</TableCell>
              <TableCell>{job?.createdAt?.split("T")?.[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-25">
                    <div onClick={() => navigate(`/admin/companies/${job?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-5" />
                      <span className="font-semibold">Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable