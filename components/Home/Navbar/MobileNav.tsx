import { navLinks } from "@/constant/constant";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";
import { usePathname } from "next/navigation";

// define props type
type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const pathname = usePathname();
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  
  return (
    <div>
      {/* Overlay */}
      <div
        onClick={closeNav}
        className={`fixed ${navOpen} top-0 transform transition-all duration-500 z-[10000] left-0 right-0 bottom-0 bg-black opacity-70 w-full h-[100vh]`}
      />
      <div
        className={`text-white ${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-indigo-900 space-y-6 z-[100006]`}
      >
        {/* NavLinks */}
        {navLinks.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link key={link.id} href={link.url} onClick={closeNav}>
              <p className={`nav__link text-[20px] ml-12 border-b-[1.5px] pb-2 border-white sm:text-[30px] 
                ${isActive ? 'text-yellow-400' : ''}`}>
                {link.label}
              </p>
            </Link>
          );
        })}
        {/* Close button */}
        <CgClose
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 text-white"
        />
      </div>
    </div>
  );
};

export default MobileNav;
