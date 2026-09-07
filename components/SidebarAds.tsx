"use client";

export default function SidebarAds() {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; }
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

  return (
    <>
      {/* Left Banner */}
      <aside className="hidden lg:block fixed left-2 top-24 w-[160px] h-[600px] z-[9999]">
        <iframe
          srcDoc={adHtml}
          width="160"
          height="600"
          style={{ border: 'none', overflow: 'hidden' }}
          title="Adsterra Left Banner"
        />
      </aside>

      {/* Right Banner */}
      <aside className="hidden lg:block fixed right-2 top-24 w-[160px] h-[600px] z-[9999]">
        <iframe
          srcDoc={adHtml}
          width="160"
          height="600"
          style={{ border: 'none', overflow: 'hidden' }}
          title="Adsterra Right Banner"
        />
      </aside>
    </>
  );
}