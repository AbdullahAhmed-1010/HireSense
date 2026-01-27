import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { setApplicants } from "@/redux/applicationSlice";

const StatusBadge = ({ status }) => {
  if (!status || status === "pending") return null;

  const base = "px-3 py-1 rounded-full text-xs font-semibold inline-block";

  return status === "accepted" ? (
    <span className={`${base} bg-green-100 text-green-700`}>Accepted</span>
  ) : (
    <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>
  );
};

const ApplicantsTable = () => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [filter, setFilter] = React.useState("all");

  const filteredApplicants =
    filter === "all"
      ? applicants
      : applicants.filter((item) => item.status === filter);

  const updateLocalStatus = (id, status) => {
    dispatch(
      setApplicants(
        applicants.map((item) =>
          item._id === id ? { ...item, status } : item,
        ),
      ),
    );
  };

  const statusHandler = async (status, id) => {
    const previous = applicants.find((a) => a._id === id)?.status || "pending";

    updateLocalStatus(id, status);

    const undoToast = toast.success(`Marked as ${status}`, {
      action: {
        label: "Undo",
        onClick: () => updateLocalStatus(id, previous),
      },
      duration: 5000,
    });

    try {
      await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true },
      );
    } catch (err) {
      toast.dismiss(undoToast);
      updateLocalStatus(id, previous);
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {["all", "accepted", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-md border text-sm ${
              filter === f ? "bg-black text-white" : "bg-white"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <Table>
        <TableCaption>List of your recent applicants!</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredApplicants.map((item) => {
            const locked = item._ui.isFinal;

            return (
              <TableRow
                key={item._id}
                className={`transition-colors ${
                  item._ui.isAccepted && "bg-green-50"
                } ${item._ui.isRejected && "bg-red-50"}`}
              >
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>

                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>

                <TableCell className="text-right">
                  {locked ? (
                    <div
                      title="Status already finalized"
                      className="cursor-not-allowed"
                    >
                      <StatusBadge status={item.status} />
                    </div>
                  ) : (
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>

                      <PopoverContent className="w-32">
                        {["accepted", "rejected"].map((s) => (
                          <div
                            key={s}
                            onClick={() => statusHandler(s, item._id)}
                            className="cursor-pointer my-2"
                          >
                            <span
                              className={`font-semibold ${
                                s === "accepted"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;