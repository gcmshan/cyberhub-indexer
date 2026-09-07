"use client";
import { useEffect, useRef } from "react";

export default function SidebarAds() {
  const leftAdRef = useRef<HTMLDivElement>(null);
  const rightAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = (container: HTMLDivElement | null) => {
      if (!container || container.children.length > 0) return;

      const scriptConfig = document.createElement("script");
      scriptConfig.type = "text/javascript";
      scriptConfig.text = `
        atOptions = {
          'key' : 'e21e0e45d975b4363f88fdde709cf094',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `;

      const scriptInvoke = document.createElement("script");
      scriptInvoke.type = "text/javascript";
      scriptInvoke.src = "https://www.highrevenueformat.com/e21e0e45d975b4363f88fdde709cf094/invoke.js";

      container.appendChild(scriptConfig);
      container.appendChild(scriptInvoke);
    };

    loadAd(leftAdRef.current);
    loadAd(rightAdRef.current);
  }, []);

  return (
    <>
      {/* Left Banner */}
      <div className="hidden 2xl:block fixed left-2 top-24 w-[160px] h-[600px] z-50 pointer-events-auto">
        <div ref={leftAdRef} className="w-full h-full min-h-[600px]" />
      </div>

      {/* Right Banner */}
      <div className="hidden 2xl:block fixed right-2 top-24 w-[160px] h-[600px] z-50 pointer-events-auto">
        <div ref={rightAdRef} className="w-full h-full min-h-[600px]" />
      </div>
    </>
  );
}