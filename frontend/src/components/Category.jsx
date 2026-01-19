import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "Data Science",
    "Graphic Designer",
    "Software Developer",
    "Fullstack Developer",
    "AI/ML Engineer",
    "Machine Learning",
    "Prompt Engineering",
    "Cloud Engineering",
    "Java Developer"
]

const Category = () => {
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((cat, index) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 cursor-pointer">
                            <Button variant="outline" className="rounded-full cursor-pointer">{cat}</Button>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer"/>
            <CarouselNext className="cursor-pointer"/>
        </Carousel>
    </div>
  )
}

export default Category