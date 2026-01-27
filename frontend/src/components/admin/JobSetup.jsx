import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import useGetSingleJob from "@/hooks/useGetSingleJob";

const JobSetup = () => {

  const params = useParams();
  useGetSingleJob(params?.id)
  const { job, singleJob } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: job?.title || "",
    description: job?.description || "",
    requirements: job?.requirements || "",
    location: job?.location || "",
    salary: job?.salary || "",
    jobType: job?.jobType || "",
    experience: job?.experience || "",
    position: job?.position || 0
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        input,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
        title: singleJob?.title || "",
        description: singleJob?.description || "",
        requirements: singleJob?.requirements?.join(",") || "",
        location: singleJob?.location || "",
        salary: singleJob?.salary || "",
        jobType: singleJob?.jobType || "",
        experience: singleJob?.experience || "",
        position: singleJob?.position || 0
    });
  }, [singleJob]);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10">
        <form action="" onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Job Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="my-2">
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Frontend, Backend, Data Science, etc"
                value={input.title}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, sequi."
                value={input.description}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="Python, Java, MERN, etc"
                value={input.requirements}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="Kolkata, Bangalore, Pune, etc"
                value={input.location}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                placeholder="xx amount"
                value={input.salary}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                placeholder="Hybrid, WFH, Remote"
                value={input.jobType}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                placeholder="xx years"
                value={input.experience}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Positions</Label>
              <Input
                type="text"
                name="position"
                placeholder="xx positions"
                value={input.position}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            {loading ? (
              <Button className="w-full my-8 p-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait...
              </Button>
            ) : (
              <Button className="w-full my-8 p-4 cursor-pointer" type="submit">
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSetup;