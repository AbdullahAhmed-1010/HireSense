import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType:"Location",
        array:["Delhi", "Mumbai", "Kolkata", "Pune", "Bangalore", "Hyderabad"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Developer", "Fullstack Developer", "Java Developer"]
    },
    {
        filterType:"Salary",
        array:["25k-60k", "60k-1L", "1L-3L", "5L-10L"]
    },
    {
        filterType:"Type",
        array:["Remote", "On-Site", "Hybrid"]
    }
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup>
            {
                filterData.map((data, index) => (
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item, index) => {
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item}/>
                                        <Label>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard