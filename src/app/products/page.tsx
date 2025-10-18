import ReactLenis from "lenis/react";
import Image from "next/image";
import React from "react";

const ProductsPage = () => {
  return (
    <>
      {/* for smooth scroll */}
      <ReactLenis root />
      {/* container */}
      <div>
        {/* products */}
        <div className="flex flex-col justify-center items-center py-[15rem] px-[2rem] gap-[2rem]">
          <Image
            src="/images/1.jpeg"
            alt="product"
            width={300}
            height={300}
            className="object-cover aspect-[5/7]"
          />
          <Image
            src="/images/2.jpeg"
            alt="product"
            width={300}
            height={300}
            className="object-cover aspect-[5/7]"
          />
          <Image
            src="/images/3.jpeg"
            alt="product"
            width={300}
            height={300}
            className="object-cover aspect-[5/7]"
          />
          <Image
            src="/images/4.jpeg"
            alt="product"
            width={300}
            height={300}
            className="object-cover aspect-[5/7]"
          />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
