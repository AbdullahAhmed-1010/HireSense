import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/auth/Login.jsx"
import Signup from "./components/auth/Signup.jsx"
import Home from "./components/Home.jsx"
import Jobs from "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/Profile.jsx"
import JobDescription from "./components/JobDescription.jsx"
import Companies from "./components/admin/Companies.jsx"
import CreateCompany from "./components/admin/CreateCompany.jsx"
import CompanySetup from "./components/admin/CompanySetup.jsx"
import AdminJobs from "./components/admin/AdminJobs.jsx"
import PostJob from "./components/admin/PostJob.jsx"
import Applicants from "./components/admin/Applicants.jsx"
import ProtectedRoutes from "./components/admin/protectedRoutes.jsx"
import JobSetup from "./components/admin/JobSetup.jsx"

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/admin/companies",
    element:<ProtectedRoutes><Companies/></ProtectedRoutes>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoutes><CreateCompany/></ProtectedRoutes>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoutes><CompanySetup/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoutes><AdminJobs/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoutes><PostJob/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs/:id",
    element:<ProtectedRoutes><JobSetup/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoutes><Applicants/></ProtectedRoutes>
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}