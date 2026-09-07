"use client";

import { useEffect, useRef } from "react";

function SingleAdUnit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Direct dynamic injection matching A-Ads specification
    containerRef.current.innerHTML = `
      <div id="frame" style="width: 160px; margin: auto; z-index: 99998; height: auto;">
        <iframe 
          data-aa="2454624" 
          src="https://ad.a-ads.com/2454624/?size=160x600" 
          style="border:0; padding:0; width:160px; height:600px; overflow:hidden; display:block; margin:auto;"
          scrolling="no">
        </iframe>
      </div>
    `;
  }, []);

  return <div ref={containerRef} className="w-[160px] h-[600px]" />;
}

export default function SidebarAds() {
  return (
    <div className="pointer-events-none">
      {/* Left Banner */}
      <aside className="fixed left-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <SingleAdUnit />
      </aside>

      {/* Right Banner */}
      <aside className="fixed right-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <SingleAdUnit />
      </aside>
    </div>
  );
}