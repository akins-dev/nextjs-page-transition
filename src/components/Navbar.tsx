import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed w-[100vw] p-[2rem] flex justify-between items-center z-1 font-[family-name:var(--font-geist-mono)]">
      {/* nav logo */}
      <div className="">
        <Link
          href="/"
          className="text-[01.25rem] uppercase text-[#141414] font-500"
        >
          Lifestyle
        </Link>
      </div>
      {/* nav links */}
      <div className="flex gap-[2rem]">
        <Link
          href="/"
          className="text-[0.9rem] uppercase text-[#141414] font-500"
        >
          Main
        </Link>
        <Link
          href="/products"
          className="text-[0.9rem] uppercase text-[#141414] font-500"
        >
          Products
        </Link>
        <Link
          href="/contact"
          className="text-[0.9rem] uppercase text-[#141414] font-500"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
