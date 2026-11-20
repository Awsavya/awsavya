import json
import re
import urllib.request
from collections import deque
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag

from bs4 import BeautifulSoup

BASE = "https://www.awsavya.in"
START = ["/", "/services", "/work", "/about", "/contact", "/privacy", "/robots.txt", "/sitemap.xml", "/site.webmanifest", "/missing-page-audit-check"]
queue = deque(START)
seen = set()
pages = []

while queue and len(seen) < 40:
    path = queue.popleft()
    if path in seen:
        continue
    seen.add(path)
    url = urljoin(BASE, path)
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 AWSAVYA site inventory"}), timeout=20) as response:
            body = response.read().decode("utf-8", errors="replace")
            entry = {"url": url, "status": response.status, "final_url": response.url, "headers": dict(response.headers)}
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        entry = {"url": url, "status": error.code, "final_url": error.url, "headers": dict(error.headers)}
    except Exception as error:
        pages.append({"url": url, "error": str(error)})
        continue

    if path.endswith((".txt", ".xml", ".webmanifest")):
        entry["body"] = body[:20000]
    else:
        soup = BeautifulSoup(body, "html.parser")
        main = soup.find("main") or soup.body or soup
        for tag in main.find_all(["script", "style", "noscript"]):
            tag.decompose()
        entry["title"] = soup.title.get_text(" ", strip=True) if soup.title else None
        entry["headings"] = [{"level": h.name, "text": h.get_text(" ", strip=True)} for h in main.find_all(re.compile("^h[1-6]$"))]
        entry["main_text"] = main.get_text("\n", strip=True)
        entry["links"] = [{"text": a.get_text(" ", strip=True), "href": a.get("href")} for a in soup.find_all("a", href=True)]
        entry["images"] = [{"src": i.get("src"), "alt": i.get("alt")} for i in soup.find_all("img")]
        entry["forms"] = [{"action": form.get("action"), "method": form.get("method"), "fields": [{"tag": el.name, "name": el.get("name"), "type": el.get("type"), "required": el.has_attr("required"), "label": el.get("aria-label"), "placeholder": el.get("placeholder")} for el in form.find_all(["input", "select", "textarea", "button"])]} for form in soup.find_all("form")]
        entry["meta"] = [{"name": m.get("name") or m.get("property"), "content": m.get("content")} for m in soup.find_all("meta") if m.get("name") or m.get("property")]
        entry["canonical"] = [a.get("href") for a in soup.find_all("link", rel="canonical")]
        entry["jsonld"] = [s.string for s in soup.find_all("script", type="application/ld+json")]
        for link in entry["links"]:
            href = link["href"] or ""
            if href.startswith(("mailto:", "tel:", "#", "javascript:")):
                continue
            resolved, _ = urldefrag(urljoin(url, href))
            parsed = urlparse(resolved)
            if parsed.hostname in {"awsavya.in", "www.awsavya.in"}:
                candidate = parsed.path or "/"
                if candidate not in seen and candidate not in queue and not candidate.startswith(("/_next/", "/api/")):
                    queue.append(candidate)
    pages.append(entry)

with open(Path(__file__).with_name("awsavya_live_snapshot.json"), "w", encoding="utf-8") as output:
    json.dump(pages, output, ensure_ascii=False, indent=2)

for page in pages:
    print(json.dumps({k: v for k, v in page.items() if k in {"url", "status", "final_url", "error", "title", "headings", "canonical", "forms"}}, ensure_ascii=False))
