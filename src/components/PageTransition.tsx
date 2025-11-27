"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"; 

// Register outside the component to avoid strict mode issues
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin);
}

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null); // Typed correctly
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

    // Reset blocks
    gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left" });

    // Reveal the page content
    revealPage();

    const handleRouteChange = (url: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    // Link Interception logic...
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
    const clickHandlers: EventListener[] = [];
    links.forEach((link) => {
      const onClick: EventListener = (e) => {
        e.preventDefault();
        const url = link.getAttribute("href");
        if (url && url !== pathname) handleRouteChange(url);
      };
      clickHandlers.push(onClick);
      link.addEventListener("click", onClick);
    });

    return () => {
      links.forEach((link, i) =>
        link.removeEventListener("click", clickHandlers[i])
      );
    };
  }, [router, pathname]);

  const coverPage = (url: string) => {
    const tl = gsap.timeline({
      onComplete: () => router.push(url),
    });

    // 1. Animate blocks in
    tl.to(blockRef.current, {
      scaleX: 1,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "left",
    })
      // 2. Show the logo container (opacity 1)
      .set(logoOverlayRef.current, { opacity: 1 }, "-=0.2")

      // 3. SCRAMBLE TEXT ANIMATION (Added to timeline!)
      .to(textRef.current, {
        duration: 0.8,
        scrambleText: {
          text: "AKINS.DEV", // The text to scramble TO
          chars: "XO",
          speed: 0.3,
        },
        ease: "none",
      })

      // 4. Hold for a split second so user can read it
      .to({}, { duration: 0.3 })

      // 5. Fade out logo container
      .to(logoOverlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      });
  };

  const revealPage = () => {
    // Reset text to empty so it's ready for next time
    if (textRef.current) textRef.current.innerText = "";

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
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-[100vw] h-svh flex pointer-events-none z-[9998]"
      ></div>

      <div
        ref={logoOverlayRef}
        className="fixed top-0 left-0 w-[100vw] h-svh flex justify-center items-center pointer-events-none z-[9999] bg-transparent opacity-0"
      >
        <div className="flex justify-center items-center p-[20px]">
          {/* Added text styling here so it is visible! */}
          <p
            ref={textRef}
            className="text-[#e3e4d8] text-4xl font-bold uppercase tracking-widest"
          ></p>
        </div>
      </div>
      {children}
    </>
  );
};

export default PageTransition;
