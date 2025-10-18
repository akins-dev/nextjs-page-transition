"use client";

import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const blockRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef<boolean>(false);

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blockRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "flex-1 h-full bg-[#222] scale-x-0 origin-left";
        overlayRef.current.appendChild(block);
        blockRef.current.push(block);
      }
    };

    createBlocks();

    gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left" });

    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");

      if (path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          fill: "transparent",
        });
      }
    }

    revealPage();

    const handleRouteChange = (url: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
    const clickHandlers: EventListener[] = [];

    links.forEach((link) => {
      const onClick: EventListener = (e) => {
        e.preventDefault();
        const url = link.getAttribute("href");
        if (url && url !== pathname) {
          handleRouteChange(url);
        }
      };
      clickHandlers.push(onClick);
      link.addEventListener("click", onClick);
    });

    return () => {
      links.forEach((link, i) => {
        link.removeEventListener("click", clickHandlers[i]);
      });
    };
  }, [router, pathname]);

  const coverPage = (url: string) => {
    const tl = gsap.timeline({
      onComplete: () => router.push(url),
    });

    const path =
      logoRef.current && logoRef.current.querySelector
        ? (logoRef.current.querySelector("path") as SVGPathElement | null)
        : null;

    tl.to(blockRef.current, {
      scaleX: 1,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "left",
    }).set(logoOverlayRef.current, { opacity: 1 }, "-=0.2");

    if (path) {
      const pathLength = path.getTotalLength();
      tl.set(
        path,
        {
          strokeDashoffset: pathLength,
          fill: "transparent",
        },
        "-=0.25"
      )
        .to(
          path,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
          },
          "-=0.5"
        )
        .to(
          path,
          {
            fill: "#e3e4d8",
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        );
    }

    tl.to(logoOverlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const revealPage = () => {
    gsap.set(blockRef.current, { scaleX: 1, transformOrigin: "right" });

    gsap.to(blockRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  }

  return (
    <>
      {/* transition overlay */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-[100vw] h-svh flex pointer-events-none z-2"
      ></div>
      {/* logo overlay */}
      <div
        ref={logoOverlayRef}
        className="fixed top-0 left-0 w-[100vw] h-svh flex justify-center items-center pointer-events-none z-2 bg-[#222] opacity-0"
      >
        {/* logo container */}
        <div className="w-[200px] h-[200px] flex justify-center items-center p-[20px] ">
          <Logo ref={logoRef} />
        </div>
      </div>
      {children}
    </>
  );
};

export default PageTransition;
