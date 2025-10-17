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
        <div>
          <Image src="/images/1.jpeg" alt="product" width={100} height={300} />
          <Image src="/images/2.jpeg" alt="product" width={100} height={300} />
          <Image src="/images/3.jpeg" alt="product" width={100} height={300} />
          <Image src="/images/4.jpeg" alt="product" width={100} height={300} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
