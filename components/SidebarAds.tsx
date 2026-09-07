"use client";

import { useEffect, useRef } from "react";

function AdSlot() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
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

  return <div ref={containerRef} className="w-[160px] h-[600px] border border-dashed border-slate-700 flex items-center justify-center text-xs text-slate-500" />;
}

export default function SidebarAds() {
  return (
    <>
      {/* Left Banner - Always Rendered */}
      <aside className="fixed left-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <AdSlot />
      </aside>

      {/* Right Banner - Always Rendered */}
      <aside className="fixed right-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <AdSlot />
      </aside>
    </>
  );
}