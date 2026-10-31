"""Regression checks for Teregon's public pages and share metadata."""

from html.parser import HTMLParser
import os
from pathlib import Path
import unittest


ROOT = Path(os.environ.get("TEREGON_SITE_ROOT", Path(__file__).resolve().parents[1]))
PAGES = ("index.html", "work.html", "approach.html", "about.html")


class PageMetadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.canonical = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            key = attrs.get("property") or attrs.get("name")
            if key:
                self.meta[key] = attrs.get("content", "")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href", ""))


class TeregonSiteContract(unittest.TestCase):
    def test_every_public_page_has_complete_share_metadata(self):
        for name in PAGES:
            with self.subTest(page=name):
                parser = PageMetadata()
                parser.feed((ROOT / name).read_text())
                for key in ("og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image"):
                    self.assertTrue(parser.meta.get(key), f"{name} missing {key}")
                self.assertEqual(parser.meta["twitter:card"], "summary_large_image")
                self.assertEqual(len(parser.canonical), 1)
                self.assertEqual(parser.meta["og:url"], parser.canonical[0])

    def test_social_preview_asset_exists_and_matches_declared_dimensions(self):
        image = ROOT / "assets/social-preview.jpg"
        self.assertTrue(image.is_file())
        data = image.read_bytes()
        # JPEG SOF0/SOF2 marker: width and height are in the frame header.
        dimensions = None
        i = 2
        while i < len(data) - 9:
            if data[i] != 0xFF:
                i += 1
                continue
            marker = data[i + 1]
            length = int.from_bytes(data[i + 2:i + 4], "big")
            if marker in (0xC0, 0xC2):
                dimensions = (int.from_bytes(data[i + 7:i + 9], "big"), int.from_bytes(data[i + 5:i + 7], "big"))
                break
            i += 2 + length
        self.assertEqual(dimensions, (1730, 909))

    def test_homepage_has_grounded_case_studies_and_named_team(self):
        home = (ROOT / "index.html").read_text()
        about = (ROOT / "about.html").read_text()
        self.assertIn("BrioScope", home)
        self.assertIn("An illustrative Teregon concept", home)
        self.assertIn("From ridge to river", home)
        self.assertIn("Where heat settles", home)
        for person in ("Misha Lubich", "Joseph Heupler", "Yuvaraj Tankala"):
            self.assertIn(person, about)

    def test_homepage_explains_how_business_impact_is_measured(self):
        home = (ROOT / "index.html").read_text()
        for phrase in ("baseline", "revenue protected", "client has verified it"):
            self.assertIn(phrase, home.lower())

    def test_homepage_covers_the_brio_product_portfolio(self):
        home = (ROOT / "index.html").read_text().lower()
        for project in ("briobot", "briopedia", "brioscope", "sales navigator"):
            self.assertIn(project, home)

    def test_team_cards_use_local_optimized_portraits_with_alt_text(self):
        about = (ROOT / "about.html").read_text()
        self.assertEqual(about.count('class="team-photo"'), 3)
        for photo in ("team-misha.webp", "team-joseph.webp", "team-yuvaraj.webp"):
            self.assertIn(photo, about)
            asset = ROOT / "assets" / photo
            self.assertTrue(asset.is_file())
            self.assertLess(asset.stat().st_size, 80_000)
        for name in ("Misha Lubich", "Joseph Heupler", "Yuvaraj Tankala"):
            self.assertIn(f'alt="{name}"', about)

    def test_about_links_each_team_member_to_their_own_site(self):
        about = (ROOT / "about.html").read_text()
        for url in ("https://mishalubich.com/", "https://www.josephheupler.com/", "https://yuvarajt.com/"):
            self.assertIn(url, about)
        self.assertIn("Yuvaraj Tankala", about)

    def test_site_does_not_link_to_github(self):
        for name in PAGES:
            self.assertNotIn("github.com", (ROOT / name).read_text().lower())

    def test_motion_respects_reduced_motion_and_mobile_layout_is_defined(self):
        css = (ROOT / "styles.css").read_text()
        self.assertIn("prefers-reduced-motion:reduce", css)
        self.assertIn("@media(max-width:560px)", css)
        self.assertIn("visual-sheen", css)


if __name__ == "__main__":
    unittest.main()
