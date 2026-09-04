export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    // CORS Headers for Frontend access
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Search Route (/api/search?q=game)
    if (url.pathname === "/api/search") {
      if (!query) {
        return new Response(JSON.stringify({ error: "Query parameter 'q' is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      try {
        // Target Site Scraping Request
        const targetUrl = `https://fitgirl-repacks.site/?s=${encodeURIComponent(query)}`;
        const response = await fetch(targetUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        });

        const html = await response.text();
        
        // Return scraped HTML / Data
        return new Response(JSON.stringify({ query, result_length: html.length, status: "success" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    return new Response(JSON.stringify({ message: "CyberHub Indexer API is Online" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};