"use client";

import { navLinks } from "@/constant/constant";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

// define props type
type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      }
      if (window.scrollY < 90) {
        setNavBg(false);
      }
    };

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isNonHomePage = pathname !== '/';

  return (
    <div
      className={`fixed ${
        navBg || isNonHomePage ? "bg-indigo-950" : "bg-transparent"
      } w-full transition-all duration-200 h-[12vh] z-[1000]`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <Image src="/images/unifilm-logo.PNG" alt="Logo" width={70} height={70} />
        {/* NavLinks */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link key={link.id} href={link.url}>
                <p className={`nav__link ${isActive ? 'text-yellow-400 after:scale-x-100' : ''}`}>
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/admissions">
            <button className="md:px-10 md:py-2 px-8 py-1 text-white font-semibold text-base bg-[#a36105] hover:bg-[#875004] transition-all duration-300 rounded-lg flex items-center group">
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
          {/* Burger menu */}
          <HiBars3BottomRight
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-white lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
