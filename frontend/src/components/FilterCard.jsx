import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

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
        array:["Remote", "WFH", "Hybrid"]
    }
]

const FilterCard = () => {

  const [value, setValue] = useState("")
  const dispatch = useDispatch()
  
  const changeHandler = (value) => {
    setValue(value)
  }
  useEffect(() => {
    dispatch(setSearchedQuery(value))
  }, [value])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup value={value} onValueChange={changeHandler}>
            {
                filterData.map((data, index) => (
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <Label htmlFor={itemId}>{item}</Label>
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