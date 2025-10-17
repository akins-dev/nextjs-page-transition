import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      {/* nav logo */}
      <div>
        <Link href="/">Lifestyle</Link>
      </div>
      {/* nav links */}
      <div>
        <Link href="/">Main</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
