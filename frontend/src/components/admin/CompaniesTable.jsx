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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const CompaniesTable = () => {

  const { companies, searchCompany } = useSelector((store) => store.company);
  const [filter, setFilter] = useState(companies)

  useEffect(() => {
    const filteredCompany = companies?.length >= 0 && companies.filter((company) => {
        if (!searchCompany){
            return true
        }
        return company?.name?.toLowerCase()?.includes(searchCompany?.toLowerCase()) || 
        company?.location?.toLowerCase()?.includes(searchCompany?.toLowerCase())
    })
    setFilter(filteredCompany)
  }, [companies, searchCompany])
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
          {filter?.map((company) => (
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage className="w-fit" src={company?.logo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{company?.name}</TableCell>
              <TableCell>{company?.location}</TableCell>
              <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-25">
                    //edit button function
                    <div className="flex items-center gap-2 w-fit cursor-pointer">
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

export default CompaniesTable