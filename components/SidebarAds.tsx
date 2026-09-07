"use client";
import { useEffect, useRef } from "react";

export default function SidebarAds() {
  const leftAdRef = useRef<HTMLDivElement>(null);
  const rightAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createAdScript = () => {
      const fragment = document.createDocumentFragment();
      
      const conf = document.createElement("script");
      conf.type = "text/javascript";
      conf.text = `
        atOptions = {
          'key' : 'e21e0e45d975b4363f88fdde709cf094',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `;
      
      const inv = document.createElement("script");
      inv.type = "text/javascript";
      inv.src = "https://www.highrevenueformat.com/e21e0e45d975b4363f88fdde709cf094/invoke.js";

      fragment.appendChild(conf);
      fragment.appendChild(inv);
      return fragment;
    };

    if (leftAdRef.current && leftAdRef.current.children.length === 0) {
      leftAdRef.current.appendChild(createAdScript());
    }

    if (rightAdRef.current && rightAdRef.current.children.length === 0) {
      rightAdRef.current.appendChild(createAdScript());
    }
  }, []);

  return (
    <>
      {/* Left Ad Container */}
      <aside 
        className="hidden xl:block fixed left-0 top-20 w-[160px] h-[600px]"
        style={{ zIndex: 99999 }}
      >
        <div ref={leftAdRef} className="w-[160px] h-[600px] bg-transparent" />
      </aside>

      {/* Right Ad Container */}
      <aside 
        className="hidden xl:block fixed right-0 top-20 w-[160px] h-[600px]"
        style={{ zIndex: 99999 }}
      >
        <div ref={rightAdRef} className="w-[160px] h-[600px] bg-transparent" />
      </aside>
    </>
  );
}