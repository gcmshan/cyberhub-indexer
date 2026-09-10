"use client";

import { useEffect, useRef } from "react";

function SingleAdUnit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const scriptOption = document.createElement("script");
    scriptOption.type = "text/javascript";
    scriptOption.text = `
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
    scriptInvoke.src = "//www.highrevenueformat.com/e21e0e45d975b4363f88fdde709cf094/invoke.js";

    containerRef.current.appendChild(scriptOption);
    containerRef.current.appendChild(scriptInvoke);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[160px] h-[600px] bg-slate-900/40 border border-slate-800/50 rounded-xl overflow-hidden flex items-center justify-center"
    />
  );
}

export default function SidebarAds() {
  return (
    <div className="pointer-events-none hidden lg:block">
      {/* Left Sidebar */}
      <aside className="fixed left-2 top-24 w-[160px] h-[600px] z-40 pointer-events-auto">
        <SingleAdUnit />
      </aside>

      {/* Right Sidebar */}
      <aside className="fixed right-2 top-24 w-[160px] h-[600px] z-40 pointer-events-auto">
        <SingleAdUnit />
      </aside>
    </div>
  );
}