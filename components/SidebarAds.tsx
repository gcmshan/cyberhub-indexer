"use client";

import { useEffect, useRef } from "react";

function AdUnit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous scripts on re-render
    containerRef.current.innerHTML = "";

    const confScript = document.createElement("script");
    confScript.type = "text/javascript";
    confScript.text = `
      atOptions = {
        'key' : 'e21e0e45d975b4363f88fdde709cf094',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = "https://www.highrevenueformat.com/e21e0e45d975b4363f88fdde709cf094/invoke.js";

    containerRef.current.appendChild(confScript);
    containerRef.current.appendChild(invokeScript);
  }, []);

  return <div ref={containerRef} className="w-[160px] h-[600px]" />;
}

export default function SidebarAds() {
  return (
    <div className="pointer-events-none">
      {/* Left Banner */}
      <aside className="fixed left-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <AdUnit />
      </aside>

      {/* Right Banner */}
      <aside className="fixed right-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <AdUnit />
      </aside>
    </div>
  );
}