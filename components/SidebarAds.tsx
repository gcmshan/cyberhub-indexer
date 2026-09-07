"use client";

import { useEffect, useRef } from "react";

function AdSlot() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove existing scripts if re-rendering
    containerRef.current.innerHTML = "";

    const scriptOptions = document.createElement("script");
    scriptOptions.type = "text/javascript";
    scriptOptions.text = `
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
    scriptInvoke.async = true;

    containerRef.current.appendChild(scriptOptions);
    containerRef.current.appendChild(scriptInvoke);
  }, []);

  return <div ref={containerRef} className="w-[160px] h-[600px] min-h-[600px]" />;
}

export default function SidebarAds() {
  return (
    <>
      {/* Left Banner */}
      <aside className="hidden xl:block fixed left-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <AdSlot />
      </aside>

      {/* Right Banner */}
      <aside className="hidden xl:block fixed right-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <AdSlot />
      </aside>
    </>
  );
}