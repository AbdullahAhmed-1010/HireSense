import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobs = () => {

  const {appliedJobs} = useSelector(store => store.job)
  return (
    <div>
        <Table>
            <TableCaption>List of your applied jobs!</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    appliedJobs.length <= 0 ? (<span>You haven't applied any jobs yet!</span>) : appliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob?._id}>
                            <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell>{appliedJob?.job?.title}</TableCell>
                            <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                            <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? "bg-red-500 hover:bg-red-400" 
                                : appliedJob?.status === "pending" ? "bg-gray-400 hover:bg-gray-300" : "bg-green-400 hover:bg-green-300"}`}>{appliedJob?.status?.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobs