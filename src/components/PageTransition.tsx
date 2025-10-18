"use client";

import Logo from "./Logo";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* transition overlay */}
      <div className="fixed top-0 left-0 w-[100vw] h-svh flex pointer-events-none z-2"></div>
      {/* logo overlay */}
      <div className="fixed top-0 left-0 w-[100vw] h-svh flex justify-center items-center pointer-events-none z-2 bg-[#222] opacity-0">
        {/* logo container */}
        <div className="w-[200px] h-[200px] flex justify-center items-center p-[20px] ">
          <Logo />
        </div>
      </div>
      {/* <div className="flex-1 h-full bg-[#222] scale-x-0 origin-left"></div> */}
      {children}
    </>
  );
};

export default PageTransition;
