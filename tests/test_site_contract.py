"""Source-level contracts for Teregon's Next.js public site."""

import os
from pathlib import Path
import re
import unittest


ROOT = Path(os.environ.get("TEREGON_SITE_ROOT", Path(__file__).resolve().parents[1]))
ROUTES = {
    "/": "app/page.tsx",
    "/work.html": "app/work.html/page.tsx",
    "/approach.html": "app/approach.html/page.tsx",
    "/about.html": "app/about.html/page.tsx",
    "/water.html": "app/water.html/page.tsx",
    "/briobot.html": "app/briobot.html/page.tsx",
    "/briopedia.html": "app/briopedia.html/page.tsx",
    "/pitch-deck.html": "app/pitch-deck.html/page.tsx",
}


def source(path):
    return (ROOT / path).read_text()


def normalize(value):
    return re.sub(r"\s+", " ", value)


def image_dimensions(data):
    """Read JPEG dimensions from a baseline or progressive frame marker."""
    index = 2
    while index < len(data) - 9:
        if data[index] != 0xFF:
            index += 1
            continue
        marker = data[index + 1]
        length = int.from_bytes(data[index + 2:index + 4], "big")
        if marker in (0xC0, 0xC2):
            return (
                int.from_bytes(data[index + 7:index + 9], "big"),
                int.from_bytes(data[index + 5:index + 7], "big"),
            )
        index += 2 + length
    return None


class TeregonSiteContract(unittest.TestCase):
    def test_next_font_variables_are_available_to_root_design_tokens(self):
        layout = source("app/layout.tsx")
        self.assertRegex(layout, r'<html lang="en" className=\{`\$\{inter\.variable\} \$\{spaceGrotesk\.variable\} \$\{dmMono\.variable\}`\}>')

    def test_vercel_uses_nextjs_framework_instead_of_public_static_output(self):
        config = source("vercel.json")
        self.assertIn('"framework": "nextjs"', config)

    def test_next_routes_export_canonical_open_graph_and_twitter_metadata(self):
        layout = source("app/layout.tsx")
        self.assertIn('new URL("https://teregonlabs.com")', layout)
        self.assertIn('card: "summary_large_image"', layout)
        self.assertIn('url: "/assets/social-preview.jpg"', layout)

        for canonical, route_file in ROUTES.items():
            with self.subTest(route=canonical):
                route = source(route_file)
                self.assertRegex(route, r"export const metadata\s*:\s*Metadata\s*=")
                self.assertRegex(route, r"(?:const\s+title\s*=|title\s*:)" )
                self.assertRegex(route, r"(?:const\s+description\s*=|description\s*:)" )
                self.assertRegex(route, rf'canonical:\s*"{re.escape(canonical)}"')
                self.assertIn("openGraph:", route)
                self.assertIn("twitter:", route)
                self.assertIn("images:", route)
        sitemap = source("public/sitemap.xml")
        for canonical in ROUTES:
            self.assertIn(f"https://teregonlabs.com{canonical}", sitemap)

    def test_social_preview_dimensions_match_root_metadata(self):
        layout = source("app/layout.tsx")
        match = re.search(
            r'url:\s*"(/assets/social-preview\.jpg)"\s*,\s*width:\s*(\d+)\s*,\s*height:\s*(\d+)',
            layout,
        )
        self.assertIsNotNone(match, "root Open Graph image must declare dimensions")
        asset = ROOT / "public" / match.group(1).lstrip("/")
        self.assertTrue(asset.is_file())
        self.assertEqual(image_dimensions(asset.read_bytes()), (int(match.group(2)), int(match.group(3))))

    def test_homepage_has_plain_service_copy_and_named_offerings(self):
        home = source("components/pages/home-page.tsx").lower()
        for phrase in (
            "applied ai / software studio",
            "custom ai and software for business workflows",
            "support assistants",
            "workflow automation",
            "teregon aqua is our focused practice for water-product service",
        ):
            self.assertIn(phrase, home)
        for offering in ("teregon aqua", "teregon oasis", "teregon aquifer", "teregon zephyr", "teregon equinox", "teregon terra"):
            with self.subTest(offering=offering):
                self.assertIn(offering, home)
        shell = source("components/site-shell.tsx")
        for offering in ("Teregon Aqua", "Teregon Oasis", "Teregon Aquifer", "Teregon Zephyr", "Teregon Equinox", "Teregon Terra"):
            self.assertIn(offering, shell)
        self.assertIn("these are named services", home)
        self.assertIn("not standalone off-the-shelf products", home)

    def test_prior_brio_cases_are_attributed_and_company_arr_is_not_credited(self):
        home = source("components/pages/home-page.tsx")
        for project in ("BrioScope", "BrioBot", "Briopedia"):
            self.assertIn(project, home)
        self.assertIn("PRIOR BRIO TEAM EXPERIENCE", home)
        self.assertIn("not Teregon client engagements", home)
        self.assertIn("approximately $240K", home)
        self.assertIn("not attributed to BrioBot", home)
        self.assertIn("approximately $2M", home)
        self.assertIn("not attributed to Briopedia", home)
        self.assertIn("/briobot.html", home)
        self.assertIn("/briopedia.html", home)
        for route, evidence in (
            ("components/pages/briobot-page.tsx", ("Salesforce", "LangGraph", "Deterministic write gates", "not attributed to BrioBot")),
            ("components/pages/briopedia-page.tsx", ("FAISS index", "git-backed", "not a Teregon client engagement")),
        ):
            content = source(route).lower()
            for phrase in evidence:
                self.assertIn(phrase.lower(), content)

    def test_case_and_workflow_visuals_use_local_descriptive_assets(self):
        home = source("components/pages/home-page.tsx")
        for asset, alt in (
            ("/assets/mesh/ai-workflow.webp", "luminous points moving across a flowing information landscape"),
            ("/assets/mesh/brioscope.webp", "three-dimensional mesh grouping customer support events"),
            ("/assets/mesh/briobot.webp", "three-dimensional workflow mesh for support evidence checks"),
            ("/assets/mesh/briopedia.webp", "three-dimensional knowledge mesh representing a support library"),
            ("/assets/water-droplet-pond.webp", "water droplet falling into a forest pond"),
        ):
            with self.subTest(asset=asset):
                self.assertIn(asset, home)
                self.assertIn(alt.lower(), home.lower())
                self.assertTrue((ROOT / "public" / asset.lstrip("/")).is_file())
        for route, asset in (
            ("components/pages/briobot-page.tsx", "/assets/mesh/briobot.webp"),
            ("components/pages/briopedia-page.tsx", "/assets/briopedia/briopedia_infographic_dark.webp"),
        ):
            self.assertIn(asset, source(route))
            self.assertTrue((ROOT / "public" / asset.lstrip("/")).is_file())
        self.assertIn("NOT A SCREENSHOT", source("components/pages/briopedia-page.tsx"))

    def test_live_client_projects_link_to_local_screenshots_and_sites(self):
        home = source("components/pages/home-page.tsx")
        for domain, asset, name, alt in (
            ("https://www.eria.co/", "/assets/project-eria.jpg", "ERIA Events", "Screenshot of the live ERIA Events website"),
            ("https://www.w3sourcing.com/", "/assets/project-w3sourcing.jpg", "W3 Sourcing", "Screenshot of the live W3 Sourcing website"),
        ):
            with self.subTest(project=name):
                self.assertIn(domain, home)
                self.assertIn(asset, home)
                self.assertIn(name, home)
                self.assertIn(alt, home)
                self.assertTrue((ROOT / "public" / asset.lstrip("/")).is_file())
        self.assertIn("Sanity", home)
        self.assertIn("methodology", home.lower())

    def test_team_profiles_link_to_personal_sites_use_local_photos_and_avoid_github(self):
        about = source("components/pages/about-page.tsx")
        self.assertIn('id="team"', about)
        self.assertIn('aria-labelledby="team-title"', about)
        for name, url, photo in (
            ("Misha Lubich", "https://www.mishalubich.com/", "/assets/team-misha.webp"),
            ("Joseph Heupler", "https://www.josephheupler.com/", "/assets/team-joseph.webp"),
            ("Yuvaraj Tankala", "https://yuvarajt.com/", "/assets/team-yuvaraj.webp"),
        ):
            with self.subTest(person=name):
                self.assertIn(name, about)
                self.assertIn(url, about)
                self.assertIn(photo, about)
                self.assertRegex(about, rf'alt:\s*"{re.escape(name)}"')
                asset = ROOT / "public" / photo.lstrip("/")
                self.assertTrue(asset.is_file())
                self.assertLess(asset.stat().st_size, 150_000)
        public_sources = [source(path) for path in ROUTES.values()]
        public_sources += [source("components/site-shell.tsx"), source("components/pages/home-page.tsx"), source("components/pages/about-page.tsx")]
        self.assertNotIn("github.com", "\n".join(public_sources).lower())

    def test_mobile_navigation_is_accessible_and_visible_at_mobile_breakpoint(self):
        shell = source("components/site-shell.tsx")
        css = normalize(source("app/globals.css"))
        self.assertIn('<nav className="desktop-nav" aria-label="Main navigation">', shell)
        self.assertIn('<details className="mobile-nav">', shell)
        self.assertIn('<summary aria-label="Open navigation menu">', shell)
        self.assertIn('<nav className="mobile-menu-panel" aria-label="Mobile navigation">', shell)
        for href in ("/work.html", "/approach.html", "/about.html", "/water.html"):
            self.assertIn(href, shell)
        self.assertIn("@media (max-width: 760px)", css)
        self.assertRegex(css, r"\.desktop-nav,\.header-cta\s*\{\s*display:\s*none")
        self.assertRegex(css, r"\.mobile-nav\s*\{[^}]*display:\s*block")
        self.assertRegex(css, r"\.mobile-nav>summary\s*\{[^}]*min-height:\s*44px")

    def test_guide_disclosure_viewport_and_input_contract(self):
        guide = source("components/site-guide.tsx")
        css = normalize(source("app/globals.css"))
        self.assertIn('className="guide-dialog"', guide)
        self.assertIn('aria-labelledby="teregon-guide-title"', guide)
        self.assertIn('className="guide-messages"', guide)
        self.assertIn('role="log"', guide)
        self.assertIn('className="guide-composer"', guide)
        self.assertIn('id="guide-input"', guide)
        self.assertIn('htmlFor="guide-input"', guide)
        self.assertEqual(guide.count('className="guide-disclosure"'), 1)
        self.assertEqual(guide.count("OpenRouter privacy"), 1)
        self.assertNotIn("OpenRouter", guide[guide.index("<header className=\"guide-header\""):guide.index("</header>")])
        self.assertIn("100dvh", css)
        self.assertRegex(css, r"\.guide-messages\s*\{[^}]*overflow-y:\s*auto")
        self.assertRegex(css, r"\.guide-header\s*\{[^}]*flex:\s*none")
        self.assertRegex(css, r"\.guide-composer\s*\{[^}]*flex:\s*none")
        self.assertRegex(css, r"\.guide-composer input\s*\{[^}]*font-size:\s*16px")
        client = source("lib/guide/client.ts")
        self.assertIn("rate_limited", client)
        self.assertIn("invalid_request", client)
        self.assertIn("try again", client.lower())
        self.assertIn("setDraft", guide, "failed questions should remain available for retry")

    def test_water_drop_animation_is_independent_of_scroll_and_respects_reduced_motion(self):
        home = source("components/pages/home-page.tsx")
        motion = home[home.index("function WaterDropMotion()"):home.index("export function HomePage()")]
        self.assertIn('drop.animate([', motion)
        self.assertIn("iterations: Infinity", motion)
        self.assertIn("offset: 0.55", motion)
        self.assertIn("offset: 0.62", motion)
        self.assertIn("ring.animate([", motion)
        self.assertIn('window.matchMedia("(prefers-reduced-motion: reduce)")', motion)
        self.assertIn("animations.forEach((animation) => animation.cancel())", motion)
        self.assertNotIn("scrollY", motion)
        self.assertNotIn("scroll", motion.lower())

    def test_crawler_documents_and_sitemap_include_briobot_and_brio_cases(self):
        for file in ("public/llms.txt", "public/llms-full.txt", "public/sitemap.xml"):
            with self.subTest(file=file):
                content = source(file).lower()
                self.assertIn("briobot", content)
                self.assertIn("briobot.html", content)
        for file in ("public/llms.txt", "public/llms-full.txt"):
            content = source(file)
            for project in ("Briopedia", "BrioScope", "Sales Navigator"):
                self.assertIn(project, content)


if __name__ == "__main__":
    unittest.main()
