import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>List of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Avatar>
                            <AvatarImage src="https://t4.ftcdn.net/jpg/04/45/30/57/360_F_445305728_wbc77En8amG4xBkj8A0OsQcWWpZk3zbT.jpg"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Kolkata</TableCell>
                    <TableCell>25-01-2026</TableCell>
                    <TableCell className="text-right">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                            <PopoverContent className="w-25">
                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                    <Edit2 className='w-5'/>
                                    <span className='font-semibold'>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable