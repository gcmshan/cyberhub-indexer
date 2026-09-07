"use client";

import { useEffect, useRef } from "react";

function SingleAdUnit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear element to prevent duplication
    containerRef.current.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.width = "160";
    iframe.height = "600";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.scrolling = "no";

    containerRef.current.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              html, body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              var atOptions = {
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
      `);
      iframeDoc.close();
    }
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