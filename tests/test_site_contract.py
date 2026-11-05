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
    "/products.html": "app/products.html/page.tsx",
    "/briobot.html": "app/briobot.html/page.tsx",
    "/briopedia.html": "app/briopedia.html/page.tsx",
    "/pitch-deck.html": "app/pitch-deck.html/page.tsx",
    "/eria.html": "app/eria.html/page.tsx",
    "/brio-bot-deck.html": "app/brio-bot-deck.html/page.tsx",
    "/briopedia-deck.html": "app/briopedia-deck.html/page.tsx",
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


def png_dimensions(data):
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return (int.from_bytes(data[16:20], "big"), int.from_bytes(data[20:24], "big"))


class TeregonSiteContract(unittest.TestCase):
    def test_products_route_is_discoverable_in_sitemap_and_crawler_summaries(self):
        sitemap = source("public/sitemap.xml")
        self.assertIn("https://teregonlabs.com/products.html", sitemap)
        for path in ("public/llms.txt", "public/llms-full.txt"):
            with self.subTest(document=path):
                content = source(path).lower()
                self.assertTrue("https://teregonlabs.com/products.html" in content, f"{path} must link to Products")
                for offering in ("teregon aqua", "teregon oasis", "teregon aquifer", "teregon zephyr", "teregon equinox", "teregon terra"):
                    self.assertTrue(offering in content, f"{path} must list {offering}")
                self.assertTrue("not standalone" in content, f"{path} must say offerings are configured services")

    def test_products_page_describes_six_configured_offerings_and_has_canonical_route(self):
        self.assertTrue((ROOT / "app/products.html/page.tsx").is_file(), "Products route has not been added")
        route = source("app/products.html/page.tsx")
        self.assertTrue((ROOT / "components/pages/products-page.tsx").is_file(), "Products page component has not been added")
        page = source("components/pages/products-page.tsx").lower()
        offering_data = source("components/service-offerings.tsx").lower()
        self.assertTrue('canonical: "/products.html"' in route, "Products route must set its canonical URL")
        for offering in ("teregon aqua", "teregon oasis", "teregon aquifer", "teregon zephyr", "teregon equinox", "teregon terra"):
            with self.subTest(offering=offering):
                self.assertTrue(offering in offering_data, f"Products data missing {offering}")
        self.assertIn("offerings.map", page, "Products page must render the shared offering data")
        for detail in ("configured", "inputs", "deliverables", "human review"):
            with self.subTest(detail=detail):
                self.assertTrue(detail in page, f"Products page must explain {detail}")
        self.assertTrue("not standalone" in page, "Offerings must be identified as configured services")

    def test_products_page_has_compact_illustrated_hero_and_link_first_service_navigation(self):
        page = source("components/pages/products-page.tsx")
        styles = source("components/pages/products-page.module.css")
        self.assertIn('className={styles.heroVisual}', page)
        self.assertIn('href={`#${serviceDetails[index].id}`}', page)
        self.assertIn('href="/water.html"', page)
        self.assertIn("animation-timeline: view()", styles)
        self.assertIn("prefers-reduced-motion: reduce", styles)
        self.assertIn("@media (max-width: 620px)", styles)

    def test_products_navigation_is_linked_and_accessible(self):
        shell = source("components/site-shell.tsx")
        self.assertTrue('href="/products.html"' in shell, "Shared navigation must link to Products")
        self.assertTrue('className="products-dropdown"' in shell, "Products menu must have a disclosure")
        self.assertTrue("<summary" in shell and 'aria-label="Main navigation"' in shell, "Products disclosure must sit in the labeled navigation")

    def test_project_story_timelines_are_responsive_and_reduced_motion_safe(self):
        pages = (
            "components/pages/work-page.tsx",
            "components/pages/eria-case-study.tsx",
            "components/pages/briobot-page.tsx",
            "components/pages/briopedia-page.tsx",
        )
        for path in pages:
            with self.subTest(page=path):
                content = source(path).lower()
                self.assertIn("projecttimeline", content, f"Missing project timeline in {path}")
        timeline = source("components/project-timeline.tsx")
        self.assertIn("<ol", timeline, "Project sequences must use an ordered list")
        self.assertIn("steps.map", timeline)

        css = normalize(source("components/project-timeline.module.css")).lower()
        self.assertIn("prefers-reduced-motion: reduce", css)
        self.assertIn("@media (max-width: 860px)", css, "Timeline needs a mobile layout rule")
        self.assertIn("animation-timeline: view()", css)

    def test_project_revenue_context_is_not_attributed_to_case_study_software(self):
        for path in (
            "components/pages/eria-case-study.tsx",
            "components/pages/briobot-page.tsx",
            "components/pages/briopedia-page.tsx",
        ):
            content = source(path).lower()
            if re.search(r"\$\s?\d|arr.{0,30}\d", content):
                self.assertTrue(re.search(r"not attributed|not attributable|not caused by|company-level", content), f"Revenue context in {path} needs attribution language")

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
        self.assertIn('url: "/assets/social-preview.png"', layout)

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
            r'url:\s*"(/assets/social-preview\.png)"\s*,\s*width:\s*(\d+)\s*,\s*height:\s*(\d+)',
            layout,
        )
        self.assertIsNotNone(match, "root Open Graph image must declare dimensions")
        asset = ROOT / "public" / match.group(1).lstrip("/")
        self.assertTrue(asset.is_file())
        self.assertEqual(png_dimensions(asset.read_bytes()), (int(match.group(2)), int(match.group(3))))
        self.assertIn('"/assets/social-preview.png"', source("app/page.tsx"))

    def test_capability_art_is_original_transparent_svg_not_generated_landscape(self):
        home = source("components/pages/home-page.tsx")
        self.assertIn("/assets/illustrations/workflow.svg", home)
        self.assertIn("/assets/illustrations/software.svg", home)
        self.assertNotIn("/assets/mesh/support-automation.webp", home)
        self.assertNotIn("/assets/mesh/software-architecture.webp", home)
        for asset in ("public/assets/illustrations/workflow.svg", "public/assets/illustrations/software.svg"):
            svg = source(asset)
            self.assertIn("<svg", svg)
            self.assertIn('fill="none"', svg)
            self.assertNotIn("<image", svg)

    def test_homepage_has_plain_service_copy_and_named_offerings(self):
        home = source("components/pages/home-page.tsx").lower()
        offerings = source("components/service-offerings.tsx").lower()
        for phrase in (
            "applied ai / software studio",
            "we build support assistants, case automation, data tools, integrations, and production software",
            "support assistants",
            "workflow automation",
            "teregon aqua focuses that work on water filtration and appliance service",
        ):
            self.assertIn(phrase, home)
        for offering in ("teregon aqua", "teregon oasis", "teregon aquifer", "teregon zephyr", "teregon equinox", "teregon terra"):
            with self.subTest(offering=offering):
                self.assertIn(offering, offerings)
        shell = source("components/site-shell.tsx")
        for offering in ("Teregon Aqua", "Teregon Oasis", "Teregon Aquifer", "Teregon Zephyr", "Teregon Equinox", "Teregon Terra"):
            self.assertIn(offering, shell)
        self.assertIn("these are named services", home)
        self.assertIn("not standalone off-the-shelf products", home)

    def test_service_offerings_explain_concrete_deliverables(self):
        home = source("components/service-offerings.tsx").lower()
        for phrase in (
            "manual-grounded troubleshooting",
            "warranty workflows",
            "drafts replies from approved product and policy material",
            "versioned knowledge base",
            "deterministic checks",
            "service demand",
            "field records",
        ):
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, home)
        self.assertIn("aria-hidden=\"true\"", home)

    def test_work_capability_panels_use_real_local_images_and_descriptive_alts(self):
        work = source("components/pages/work-page.tsx")
        for asset in ("/assets/mesh/ai-workflow.webp", "/assets/mesh/brioscope.webp", "/assets/project-w3sourcing.jpg", "/assets/water-droplet-pond.webp"):
            with self.subTest(asset=asset):
                self.assertIn(asset, work)
        self.assertIn("Illustrative", work)
        self.assertNotIn("className=\"service-art art-land\"", work)

    def test_prior_brio_cases_are_attributed_and_company_arr_is_not_credited(self):
        home = source("components/pages/home-page.tsx")
        for project in ("BrioScope", "BrioBot", "Briopedia"):
            self.assertIn(project, home)
        self.assertIn("PRIOR BRIO TEAM PRODUCT EXPERIENCE", home)
        self.assertIn("not Teregon client engagements", home)
        self.assertNotIn("approximately $240K", home)
        self.assertNotIn("approximately $2M", home)
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
            ("/assets/mesh/brioscope.webp", "illustrative mesh grouping customer support events"),
            ("/assets/mesh/briobot.webp", "illustrative workflow mesh for support case evidence checks"),
            ("/assets/mesh/briopedia.webp", "illustrative knowledge mesh representing a maintained support library"),
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
        self.assertIn("sanity", home.lower())
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

    def test_case_study_presentations_have_downloadable_pdf_assets(self):
        component = source("components/pages/case-study-decks.tsx")
        for route, asset in (
            ("app/brio-bot-deck.html/page.tsx", "public/assets/case-studies/teregon-brio-bot-case-study.pdf"),
            ("app/briopedia-deck.html/page.tsx", "public/assets/case-studies/teregon-briopedia-case-study.pdf"),
        ):
            with self.subTest(asset=asset):
                self.assertTrue((ROOT / route).is_file())
                expected_url = "/assets/case-studies/" + Path(asset).name
                self.assertIn(expected_url, component)
                self.assertTrue((ROOT / asset).is_file(), f"download linked from {route} must ship")
                pdf = (ROOT / asset).read_bytes()
                self.assertTrue(pdf.startswith(b"%PDF-"))
                self.assertGreater(len(pdf), 20_000)


if __name__ == "__main__":
    unittest.main()
