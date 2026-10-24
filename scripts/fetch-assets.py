"""Fetch public project posters and self-hosted fonts. No video originals are copied."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import re
import urllib.request

ASSETS = Path(__file__).resolve().parents[1] / "dist" / "assets"
POSTERS = {
    "japan": "1axi52Em0FEGEmVvzQj83MEK6lwmiBAFU",
    "documentary": "1P-UM74Xtl1q49Mdf7bXLLIa6C2TdPk16",
    "aveeno": "1nlKih6VPkuhjQxqbSmqJ42cCx92o_3KL",
    "liquidity": "1B7LWcKobDxYJ532UTmJmuKIFHHVPhALI",
    "motion": "1p7hSmSAVMM0u23b7pPcC10W5nEq4j1I7",
    "ai-nature": "1UQw_RY1J72jDyao2qIxfvyNTYUgW12pa",
}

def download(item):
    name, file_id = item
    url = f"https://drive.google.com/thumbnail?id={file_id}&sz=w1600"
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=40) as response:
        data = response.read()
        if not response.headers.get("Content-Type", "").startswith("image/"):
            raise ValueError(f"Not an image: {name}")
    (ASSETS / f"{name}.jpg").write_bytes(data)
    print(f"{name}: {len(data)} bytes")

ASSETS.mkdir(parents=True, exist_ok=True)
with ThreadPoolExecutor(max_workers=4) as pool:
    list(pool.map(download, POSTERS.items()))

font_url = "https://fonts.googleapis.com/css2?family=Manrope:wght@400..800&display=swap"
request = urllib.request.Request(font_url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(request, timeout=30) as response:
    css = response.read().decode()
latin = css.split("/* latin */")[-1]
font_file = re.search(r"url\((https://[^)]+)\)", latin).group(1)
with urllib.request.urlopen(font_file, timeout=30) as response:
    (ASSETS / "manrope.ttf").write_bytes(response.read())
with urllib.request.urlopen("https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt", timeout=30) as response:
    (ASSETS / "manrope-license.txt").write_bytes(response.read())
print("Manrope font downloaded")

for name, url in [
    ("sora.ttf", "https://raw.githubusercontent.com/google/fonts/main/ofl/sora/Sora%5Bwght%5D.ttf"),
    ("sora-license.txt", "https://raw.githubusercontent.com/google/fonts/main/ofl/sora/OFL.txt"),
]:
    with urllib.request.urlopen(url, timeout=30) as response:
        (ASSETS / name).write_bytes(response.read())
print("Sora font downloaded")
