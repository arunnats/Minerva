"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="absolute w-full top-0 z-20">
      <div style={{ backgroundColor: "#800080" }} className="h-1 "></div>
      <div className="navbar font-teko pr-12 pl-6 items-start justify-between h-[160px] pt-5 transition-all duration-10 ease-linear max-920:h-[120px] max-800:items-center">
        <div className="relative flex gap-6 logo">
          <img
            className="h-[90px] pl-3 max-1060:h-[80px] max-800:h-[70px]"
            src="/logo.svg"
            alt="Logo"
          />

          <div className="text-white text-2xl space-[20px] pt-1 hidden max-w-[200px] max-800:block">
            National Institute of Technology Calicut
          </div>
        </div>

        <div
          className="hamburger hidden max-800:flex gap-[6px] flex-col"
          onClick={toggleMenu}
        >
          <div className="h-1 w-8 rounded-md bg-white"></div>
          <div className="h-1 w-8 rounded-md bg-white"></div>
          <div className="h-1 w-8 rounded-md bg-white"></div>
        </div>

        <div className="flex-col gap-5 uppercase flex max-1060:gap-3 max-920:mt-2 max-800:hidden links">
          <div className="flex justify-end gap-6 h-8 section1">
            <Link href="/">Home</Link>
            <Link href="/news">News and Announcements</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div>
            <Link
              href="https://minerva.arunnats.com/admin"
              style={{ color: "#800080" }}
              className="login bg-white p-[0.5] text-[28px] px-3 rounded-sm"
            >
              Login
            </Link>
          </div>
          <div className="flex justify-end gap-2 uppercase section2">
            <Link href="/faculty">Faculty</Link>
            <Link href="/programmes">Academics</Link>
            <Link href="/placements">Placement and Internships</Link>
            <Link href="/activites">Activities</Link>
            <Link href="/awards">Awards</Link>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div
          className={`transition-all duration-300 ease-in-out z-10 ${
            menuOpen ? "opacity-100" : "max-h-0 py-0 opacity-0 hidden"
          }`}
        >
          <div className="relative z-10 dropdown backdrop-blur-[5px] -mt-[100px] pt-[100px]">
            <div className="flex font-teko flex-col pt-6 p-9 uppercase text-[30px] text-white">
              <Link href="/">Home</Link>
              <Link href="/news">News and Announcements</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/faculty">Faculty</Link>
              <Link href="/programmes">Academics</Link>
              <Link href="/placements">Placement and Internships</Link>
              <Link href="/activites">Activities</Link>
              <Link href="/awards">Awards</Link>
              <div className="bg-white flex w-[77px] text-violet-700 py-[0.5] px-3 rounded-lg">
                <Link href="/login" className="login">
                  Login
                </Link>
              </div>
            </div>
            <div
              style={{ backgroundColor: "#800080" }}
              className="h-1 w-[100vw] mt-3"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
