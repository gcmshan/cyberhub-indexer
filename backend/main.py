from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
from bs4 import BeautifulSoup
import urllib.parse
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, Gecko) Chrome/122.0.0.0 Safari/537.36"
}

RAWG_API_KEY = "c37ec2b71cdc4a8abbf954e0c9becbfa"

POPULAR_GAMES = [
    "Grand Theft Auto V", "Grand Theft Auto IV", "Grand Theft Auto: San Andreas",
    "God of War", "God of War Ragnarök", "Cyberpunk 2077", "Elden Ring",
    "Red Dead Redemption 2", "Forza Horizon 5", "The Witcher 3: Wild Hunt",
    "Ghost of Tsushima", "Marvel's Spider-Man Remastered", "Hogwarts Legacy",
    "The Last of Us Part I", "Horizon Forbidden West", "Resident Evil 4",
    "Tekken 8", "FC 24", "Need for Speed Unbound", "Assassin's Creed Valhalla",
    "Call of Duty: Modern Warfare", "Far Cry 6", "Palworld", "Helldivers 2"
]

EXCLUDE_KEYWORDS = ["details", "troubleshooting", "upcoming", "faq", "repack features", "changelog", "update list"]

def is_valid_game_post(title: str) -> bool:
    title_lower = title.lower()
    for kw in EXCLUDE_KEYWORDS:
        if kw in title_lower:
            return False
    return True

# Clean game title to get better API search matches
def clean_game_title(raw_title: str) -> str:
    cleaned = re.sub(r'\(.*?\)', '', raw_title)
    cleaned = re.sub(r'\[.*?\]', '', cleaned)
    cleaned = re.sub(r'v\d+\.\d+.*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'\+.*', '', cleaned)
    return cleaned.strip()

# Fetch Exact High-Quality Cover Image from RAWG API
async def get_rawg_image(client: httpx.AsyncClient, game_title: str) -> str:
    clean_title = clean_game_title(game_title)
    try:
        url = f"https://api.rawg.io/api/games?key={RAWG_API_KEY}&search={urllib.parse.quote(clean_title)}&page_size=1"
        resp = await client.get(url, timeout=5.0)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("results") and len(data["results"]) > 0:
                bg_image = data["results"][0].get("background_image")
                if bg_image:
                    return bg_image
    except Exception as e:
        print(f"RAWG Fetch Error for ({clean_title}): {e}")
    
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800"

@app.get("/api/suggestions")
async def get_suggestions(q: str = Query("", min_length=2)):
    query_clean = q.strip().lower()
    matches = [game for game in POPULAR_GAMES if query_clean in game.lower()]

    if len(matches) < 3:
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                rawg_url = f"https://api.rawg.io/api/games?key={RAWG_API_KEY}&search={urllib.parse.quote(query_clean)}&page_size=5"
                resp = await client.get(rawg_url)
                if resp.status_code == 200:
                    data = resp.json()
                    for item in data.get("results", []):
                        name = item.get("name")
                        if name and name not in matches:
                            matches.append(name)
        except Exception as e:
            print(f"RAWG Suggestion Error: {e}")

    return {"suggestions": matches[:5]}

async def extract_magnet_or_torrent(client: httpx.AsyncClient, page_url: str):
    try:
        resp = await client.get(page_url, headers=HEADERS, timeout=6.0)
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.text, 'html.parser')
            for a in soup.find_all('a', href=True):
                if a['href'].startswith('magnet:?'):
                    return a['href']
            for a in soup.find_all('a', href=True):
                if '1337x.to' in a['href'] or 'itorrents.org' in a['href']:
                    return a['href']
            matches = re.findall(r'magnet:\?xt=urn:btih:[a-zA-Z0-9]+', resp.text)
            if matches:
                return matches[0]
    except Exception as e:
        print(f"Deep Fetch Error ({page_url}): {e}")
    return None

@app.get("/api/search")
async def search_games(q: str = Query("", min_length=1)):
    query_clean = q.strip().lower()
    results = []

    async with httpx.AsyncClient(follow_redirects=True, timeout=10.0) as client:
        # FitGirl Repacks
        try:
            fg_url = f"https://fitgirl-repacks.site/?s={urllib.parse.quote(query_clean)}"
            resp = await client.get(fg_url, headers=HEADERS)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, 'html.parser')
                articles = soup.find_all('article', class_='post')
                for article in articles:
                    title_elem = article.find('h1', class_='entry-title')
                    if not title_elem or not title_elem.find('a'): continue
                    title = title_elem.text.strip()
                    if not is_valid_game_post(title): continue

                    page_url = title_elem.find('a')['href']
                    magnet_elem = article.find('a', href=re.compile(r'^magnet:\?'))
                    magnet_link = magnet_elem['href'] if magnet_elem else await extract_magnet_or_torrent(client, page_url)
                    
                    # RAWG Official Wallpaper Fetch
                    img_url = await get_rawg_image(client, title)

                    results.append({
                        "id": f"fg-{hash(page_url)}",
                        "title": title,
                        "source": "FitGirl Repacks",
                        "image": img_url,
                        "pageUrl": page_url,
                        "magnetUrl": magnet_link
                    })
                    if len(results) >= 3: break
        except Exception as e: print(f"FitGirl Error: {e}")

        # DODI Repacks
        try:
            dodi_url = f"https://dodi-repacks.site/?s={urllib.parse.quote(query_clean)}"
            resp = await client.get(dodi_url, headers=HEADERS)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, 'html.parser')
                articles = soup.find_all('article')
                dodi_count = 0
                for article in articles:
                    title_elem = article.find(['h1', 'h2'], class_='entry-title')
                    if not title_elem or not title_elem.find('a'): continue
                    title = title_elem.text.strip()
                    if not is_valid_game_post(title): continue

                    page_url = title_elem.find('a')['href']
                    magnet_link = await extract_magnet_or_torrent(client, page_url)
                    
                    # RAWG Official Wallpaper Fetch
                    img_url = await get_rawg_image(client, title)

                    results.append({
                        "id": f"dodi-{hash(page_url)}",
                        "title": title,
                        "source": "DODI Repacks",
                        "image": img_url,
                        "pageUrl": page_url,
                        "magnetUrl": magnet_link
                    })
                    dodi_count += 1
                    if dodi_count >= 3: break
        except Exception as e: print(f"DODI Error: {e}")

    trusted_sites = [
        {"name": "FitGirl Repacks", "badge": "Verified Repacker", "url": f"https://fitgirl-repacks.site/?s={urllib.parse.quote(query_clean)}"},
        {"name": "DODI Repacks", "badge": "Verified Repacker", "url": f"https://dodi-repacks.site/?s={urllib.parse.quote(query_clean)}"},
        {"name": "SteamRIP", "badge": "Pre-Installed Direct", "url": f"https://steamrip.com/?s={urllib.parse.quote(query_clean)}"}
    ]

    return {"results": results, "trustedSites": trusted_sites}