import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";
import { toast } from "sonner";

const normalizeApplications = (applications = []) => {
  return applications.map((app) => ({
    ...app,
    _ui: {
      isAccepted: app.status === "accepted",
      isRejected: app.status === "rejected",
      isFinal: app.status === "accepted" || app.status === "rejected",
      label:
        app.status === "accepted"
          ? "Accepted"
          : app.status === "rejected"
            ? "Rejected"
            : "Pending",
    },
  }));
};

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params?.id}/applicant`,
          { withCredentials: true },
        );

        if (res.data.success) {
          dispatch(
            setApplicants(normalizeApplications(res.data.job.applications)),
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };

    fetchApplicants();
  }, [params?.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;