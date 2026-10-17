"""Check Hugo output for missing pages, local resources, and broken anchors."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / "public"
SITE = "https://xuxiaorui815.github.io/"


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.links = []
        self.has_article_body = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "post-content" in attrs.get("class", "").split():
            self.has_article_body = True
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for name in ("href", "src"):
            if attrs.get(name):
                self.links.append(attrs[name])


def main():
    required = ["index.html", "archives/index.html", "search/index.html",
                "tags/index.html", "faq/index.html", "404.html",
                "index.json", "index.xml", "sitemap.xml", "robots.txt"]
    errors = [f"Missing required output: {name}" for name in required if not (ROOT / name).is_file()]
    pages = {path: Page(path.read_text(encoding="utf-8")) for path in ROOT.rglob("*.html")}
    checked = 0
    for source, page in pages.items():
        relative = source.relative_to(ROOT).as_posix()
        expected_progress = relative.startswith("posts/") and page.has_article_body
        has_progress = "reading-coffee" in page.ids
        has_progress_script = any("/assets/js/reading-coffee." in link for link in page.links)
        if has_progress != expected_progress or has_progress_script != expected_progress:
            errors.append(f"{relative}: article reading indicator/script missing or loaded outside an article")
        url = urljoin(SITE, relative.removesuffix("index.html"))
        for link in page.links:
            target = urlsplit(urljoin(url, link))
            if target.scheme not in ("https", "http") or target.netloc != urlsplit(SITE).netloc:
                continue
            path = ROOT / unquote(target.path).lstrip("/")
            if path.is_dir():
                path /= "index.html"
            checked += 1
            if not path.is_file():
                errors.append(f"{relative}: missing {link}")
            elif target.fragment and path in pages and unquote(target.fragment) not in pages[path].ids:
                errors.append(f"{relative}: missing anchor {link}")
    for name in ("index.xml", "sitemap.xml"):
        if (ROOT / name).is_file():
            ET.parse(ROOT / name)
    if (ROOT / "index.json").is_file():
        index = json.loads((ROOT / "index.json").read_text(encoding="utf-8"))
        if not isinstance(index, list) or not index:
            errors.append("Search index is empty or invalid")
        else:
            for record in index:
                if not record.get("title") or not record.get("permalink"):
                    errors.append("Search record is missing a title or permalink")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(pages)} HTML pages, {checked} local links, search index, RSS and sitemap.")


if __name__ == "__main__":
    main()
