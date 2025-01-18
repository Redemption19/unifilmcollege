"use client";

import Image from "next/image";
import React from "react";
import { FaFile, FaStar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
// define the type
type Props = {
  course: {
    id: number;
    image: string;
    title: string;
    price: number;
    // author: string;
    // reviewNumber: number;
    lessons: number;
    students: string;
    category: string;
    duration: string;
  };
};

const CourseCard = ({ course }: Props) => {
  return (
    <Tilt>
      <Link href="/courses">
        <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <div>
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={400}
              className="w-full h-full"
            />
          </div>

          <div className="p-4">
            {/* information */}
            <div className="flex items-center mt-6 space-x-4">
              <span className="text-lg text-black text-opacity-70 font-bold">
                {course.category}
              </span>
            </div>
            {/* title */}
            <h1 className="text-xl text-black font-bold mt-2">{course.title}</h1>
            {/* duration */}
            <div className="flex mt-2 items-center space-x-2">
              <span className="text-base text-orange-800 font-semibold">
                {course.duration}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Tilt>
  );
};

export default CourseCard;
