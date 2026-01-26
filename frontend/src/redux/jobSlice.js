import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        adminJobs:[],
        singleJob: null,
        searchJob: "",
        appliedJobs:[],
        searchedQuery:""
    },
    reducers:{
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAdminJobs: (state, action) => {
            state.adminJobs = action.payload
        },
        setSearchJob: (state, action) => {
            state.searchJob = action.payload
        },
        setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        }
    }
})

export const {setAllJobs, setSingleJob, setAdminJobs, setSearchJob, setAppliedJobs, setSearchedQuery} = jobSlice.actions
export default jobSlice.reducer