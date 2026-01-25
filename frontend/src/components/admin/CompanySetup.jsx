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
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

const CompanySetup = () => {
  const { company } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [input, setInput] = useState({
    name: company?.name || "",
    description: company?.description || "",
    location: company?.location || "",
    website: company?.website || "",
    file: company?.logo || null,
  });

  const {singleCompany} = useSelector(store => store.company)

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
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
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        location: singleCompany?.location || "",
        website: singleCompany?.website || "",
        file: singleCompany?.file || null
    });
  }, [singleCompany]);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10">
        <form action="" onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="my-2">
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Google, Microsoft, Azure, etc"
                value={input.name}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Company Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, sequi."
                value={input.description}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Company Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="Kolkata, Bangalore, Pune, etc"
                value={input.location}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Company Website</Label>
              <Input
                type="text"
                name="website"
                placeholder="www.<company-name>.com"
                value={input.website}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <Label>Company Logo</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
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

export default CompanySetup;