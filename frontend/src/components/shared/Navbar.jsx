import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constants";

const Navbar = () => {
  const {user} = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, {withCredentials: true})
        if (res.data.success){
            dispatch(setUser(null))
            navigate("/")
            toast.success(res.data.message)
        }
    } catch (error){
        console.log(error)
        toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/browse">Browse</Link>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button className="cursor-pointer" variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="cursor-pointer bg-[#6A38C2] hover:bg-[#5b30a6]">Sign Up</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePicture} alt="profile" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-5 space-y-5">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePicture} alt="profile" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Test User</h3>
                    <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-800 gap-2">
                  <div className="flex w-fit items-center gap-1 cursor-pointer">
                    <User2 />
                    <Button variant="ghost"><Link to="/profile">View Profile</Link></Button>
                  </div>
                  <div className="flex w-fit items-center gap-1 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="ghost">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;