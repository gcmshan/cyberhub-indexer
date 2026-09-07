"use client";
import { useEffect, useRef } from "react";

export default function SidebarAds() {
  const leftAdRef = useRef<HTMLDivElement>(null);
  const rightAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Left Ad Inject Logic
    if (leftAdRef.current && leftAdRef.current.children.length === 0) {
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
      leftAdRef.current.appendChild(conf);
      leftAdRef.current.appendChild(inv);
    }

    // Right Ad Inject Logic
    if (rightAdRef.current && rightAdRef.current.children.length === 0) {
      const conf2 = document.createElement("script");
      conf2.type = "text/javascript";
      conf2.text = `
        atOptions = {
          'key' : 'e21e0e45d975b4363f88fdde709cf094',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `;
      const inv2 = document.createElement("script");
      inv2.type = "text/javascript";
      inv2.src = "https://www.highrevenueformat.com/e21e0e45d975b4363f88fdde709cf094/invoke.js";
      rightAdRef.current.appendChild(conf2);
      rightAdRef.current.appendChild(inv2);
    }
  }, []);

  return (
    <>
      {/* Left Banner - Standard Desktop (1024px+) වලදී පෙනේ */}
      <aside className="hidden lg:block fixed left-2 top-24 w-[160px] h-[600px] z-50">
        <div ref={leftAdRef} className="w-[160px] h-[600px]" />
      </aside>

      {/* Right Banner - Standard Desktop (1024px+) වලදී පෙනේ */}
      <aside className="hidden lg:block fixed right-2 top-24 w-[160px] h-[600px] z-50">
        <div ref={rightAdRef} className="w-[160px] h-[600px]" />
      </aside>
    </>
  );
}