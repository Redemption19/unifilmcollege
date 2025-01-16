import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-indigo-950 pt-20 pb-10">
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* 1st part */}
        <div>
          <Link href="/">
            <Image src="/images/unifilm-logo.PNG" alt="Logo" width={70} height={70} />
          </Link>
          <p className="mt-4 text-sm text-white text-opacity-60">
            Experts in film, media, and technology education. Providing comprehensive training for creative professionals.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6">
            <Link 
              href="https://facebook.com" 
              target="_blank"
              className="text-white hover:text-[#a36105] transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank"
              className="text-white hover:text-[#a36105] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank"
              className="text-white hover:text-[#a36105] transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link 
              href="https://youtube.com" 
              target="_blank"
              className="text-white hover:text-[#a36105] transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank"
              className="text-white hover:text-[#a36105] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
        {/* 2nd part */}
        <div>
          <h1 className="footer__heading">Our Courses</h1>
          <Link href="/courses/journalism-media-studies">
            <p className="footer__link">Journalism and Media Studies</p>
          </Link>
          <Link href="/courses/tv-film-production">
            <p className="footer__link">TV and Film Production</p>
          </Link>
          <Link href="/courses/graphic-design">
            <p className="footer__link">Graphic Design</p>
          </Link>
          <Link href="/courses/photography">
            <p className="footer__link">Photography</p>
          </Link>
          <Link href="/courses/sound-engineering">
            <p className="footer__link">Sound Engineering</p>
          </Link>
          <Link href="/courses/microsoft-office">
            <p className="footer__link">Microsoft Office Suite</p>
          </Link>
          <Link href="/courses/cosmetology">
            <p className="footer__link">Cosmetology</p>
          </Link>
        </div>
        {/* 3rd part */}
        <div>
          <h1 className="footer__heading">Quick Link</h1>
          <Link href="/">
            <p className="footer__link">Home</p>
          </Link>
          <Link href="/about">
            <p className="footer__link">About</p>
          </Link>
          <Link href="/courses">
            <p className="footer__link">Courses</p>
          </Link>
          <Link href="/admissions">
            <p className="footer__link">Admission</p>
          </Link>
          <Link href="/gallery">
            <p className="footer__link">Gallery</p>
          </Link>
          <Link href="/contact">
            <p className="footer__link">Contact Us</p>
          </Link>
        </div>
        {/* 4th part (newsletter) */}
        <div>
          <h1 className="footer__heading">Subscribe our Newsletter</h1>
          <input
            type="text"
            placeholder="Enter your email"
            className="px-6 py-2 rounded-lg outline-none bg-gray-700 w-full text-white"
          />
          <button className="px-6 py-2 mt-4 rounded-lg outline-none bg-rose-700 w-full text-white hover:bg-rose-800 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
      <p className="text-center mt-4 text-base text-white opacity-70">
        &copy; {new Date().getFullYear()} Unifilm College. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
