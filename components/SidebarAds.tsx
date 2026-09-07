"use client";

import { useEffect, useRef } from "react";

function SingleAdUnit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.loading = "lazy";
    iframe.style.width = "160px";
    iframe.style.height = "600px";
    iframe.style.border = "0px";
    iframe.style.overflow = "hidden";
    iframe.setAttribute("scrolling", "no");

    // Adsterra script payload injected inside isolated iframe context
    iframe.srcdoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            html, body { margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; justify-content: center; }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : 'e21e0e45d975b4363f88fdde709cf094',
              'format' : 'iframe',
              'height' : 600,
              'width' : 160,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highrevenueformat.com/e21e0e45d975b4363f88fdde709cf094/invoke.js"></script>
        </body>
      </html>
    `;

    containerRef.current.appendChild(iframe);
  }, []);

  return <div ref={containerRef} className="w-[160px] h-[600px]" />;
}

export default function SidebarAds() {
  return (
    <div className="pointer-events-none">
      {/* Left Sidebar */}
      <aside className="fixed left-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <SingleAdUnit />
      </aside>

      {/* Right Sidebar */}
      <aside className="fixed right-2 top-24 w-[160px] h-[600px] z-[99999] pointer-events-auto">
        <SingleAdUnit />
      </aside>
    </div>
  );
}