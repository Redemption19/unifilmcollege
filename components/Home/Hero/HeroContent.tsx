import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroContent = () => {
  return (
    <div>
      {/* Title */}
      <h1
        data-aos="fade-right"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[4rem] text-white"
      >
        Experts in film, media, and technology.
      </h1>
      {/* Description */}
      <p
        data-aos="fade-left"
        data-aos-delay="150"
        className="mt-6 text-sm md:text-base text-white text-opacity-60"
      >
        At UnifilmCollege we are committed to fostering innovation, critical thinking, and artistic expression, providing a comprehensive 
        education that blends practical experience with academic excellence.
      </p>
      {/* Buttons */}
      <div className="mt-8 flex items-center space-x-4">
        <Link
          href="/admissions"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <button className="button__cls bg-[#2167e8] hover:bg-[#1a51b8] transition-all duration-300 flex items-center group">
            Apply Now
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
        <Link
          href="/courses"
          data-aos="zoom-in"
          data-aos-delay="450"
        >
          <button className="button__cls bg-transparent border-2 border-[#a36105] text-[#a36105] hover:bg-[#a36105] hover:text-white transition-all duration-300 flex items-center group">
            View Courses
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
      {/* Stats */}
      <div className="flex items-center flex-wrap space-x-16 mt-8">
        <div data-aos="fade-up" data-aos-delay="600">
          <p className="md:text-xl lg:text-2xl text-base text-white font-bold">
            30+
          </p>
          <p className="w-[100px] h-[3px] bg-green-600 mt-2 mb-2 rounded-lg"></p>
          <p className="md:text-lg text-sm text-white text-opacity-70">
            Tutors
          </p>
        </div>
        <div data-aos="fade-up" data-aos-delay="750">
          <p className="md:text-xl lg:text-2xl text-base text-white font-bold">
            500+
          </p>
          <p className="w-[100px] h-[3px] bg-blue-600 mt-2 mb-2 rounded-lg"></p>
          <p className="md:text-lg text-sm text-white text-opacity-70">
            Students
          </p>
        </div>
        <div data-aos="fade-up" data-aos-delay="900">
          <p className="md:text-xl lg:text-2xl text-base text-white font-bold">
            10+
          </p>
          <p className="w-[100px] h-[3px] bg-pink-600 mt-2 mb-2 rounded-lg"></p>
          <p className="md:text-lg text-sm text-white text-opacity-70">
            Courses
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
