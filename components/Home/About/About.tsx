import React from "react";
import { FaArrowRight, FaAward } from "react-icons/fa";
import Link from "next/link";

const About = () => {
  return (
    <div className="pt-16 pb-16 ">
      {/* define grid */}
      <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        {/* 1st part */}
        <div data-aos="fade-right" data-aos-anchor-placement="top-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center flex-col">
              <FaAward className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl text-black font-semibold">
              Guaranteed and certified
            </h1>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[3.9rem] text-gray-800">
          Global Exposure and Career Opportunities
          </h1>
          <p className="mt-4 text-gray-600">
            Unifilm College opens doors to global opportunities, providing students with exposure to international networks and industry leaders. Through strategic partnerships, including our collaboration with the Youngtrepreneurs UK Film Academy, we offer internships, mentorship, and career advancement opportunities.{" "}
          </p>
          <Link href="/courses">
            <button className="flex items-center space-x-2 px-8 py-3 mt-8 bg-[#1e1b4a] hover:bg-[#a36105] transition-all duration-200 rounded-3xl text-white">
              <span>Learn More</span>
              <FaArrowRight />
            </button>
          </Link>
        </div>
        {/* 2nd part */}
        <div
          data-aos="fade-left"
          data-aos-anchor-placement="top-center"
          data-aos-delay="150"
        >
          <div>
            <h1 className="text-7xl lg:text-9xl font-bold text-black text-opacity-5">
              01
            </h1>
            <div className="-mt-10">
              <h1 className="text-xl md:text-2xl text-opacity-70 mb-3 text-black font-bold">
              Designed for Your Creative Journey
              </h1>
              <p className="w-[90%] lg:w-[70%] text-base text-black text-opacity-60">
              Whether you're studying film, media, design, or technology, we provide the freedom and support you need to pursue your passion and excel in your chosen field.
              </p>
            </div>
          </div>
          <div className="mt-8 w-full">
            <h1 className="text-7xl lg:text-9xl font-bold text-black text-opacity-5">
              02
            </h1>
            <div className="-mt-10">
              <h1 className="text-xl md:text-2xl text-opacity-70 mb-3 text-black font-bold">
                Pocket Friendly
              </h1>
              <p className="w-[90%] lg:w-[70%] text-base text-black text-opacity-60">
              Our affordable programs are designed to provide you with top-tier training without breaking the bank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
