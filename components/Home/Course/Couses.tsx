import { coursesData } from "@/data/data";
import Image from "next/image";
import React from "react";
import CourseCard from "./CourseCard";

const Couses = () => {
  return (
    <div className="pt-16 pb-12 relative bg-gray-200">
      {/* Bounce ball */}
      <Image
        src="/images/cb.png"
        alt="image"
        width={800}
        height={800}
        className="absolute top-[30%] animate-bounce"
      />
      <div className="w-[80%] pt-8 pb-8 mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl text-gray-900 font-bold">
          Popular Courses
        </h1>
        {/* Courses */}
        <div className="md:mt-16 mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {coursesData.map((course, i) => {
            return (
              // Individual course Card
              <div
                key={course.id}
                data-aos="fade-right"
                data-aos-anchor-placement="top-center"
                data-aos-delay={`${i * 150}`}
              >
                <CourseCard course={course} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Couses;
