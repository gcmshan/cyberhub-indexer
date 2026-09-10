"use client";

import { useEffect, useRef } from "react";

function SingleAdUnit() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const adHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; background: transparent; }
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
          <script type="text/javascript" src="//www.highrevenueformat.com/e21e0e45d975b4363f88fdde709cf094/invoke.js"></script>
        </body>
      </html>
    `;

    const doc = iframeRef.current.contentDocument;
    if (doc) {
      doc.open();
      doc.write(adHtml);
      doc.close();
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      width="160"
      height="600"
      className="border-0 overflow-hidden w-[160px] h-[600px] bg-slate-900/40 border border-slate-800/50 rounded-xl"
      scrolling="no"
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