import Link from "next/link";
export { GuideWidget } from "@/components/site-guide";

const products = [
  { name: "Teregon Aqua", href: "/water.html", detail: "Focused water-industry practice" },
  { name: "Teregon Oasis", href: "/#offerings", detail: "Support automation for water and product teams" },
  { name: "Teregon Aquifer", href: "/#offerings", detail: "Grounded search across manuals, policies, and case history" },
  { name: "Teregon Zephyr", href: "/#offerings", detail: "Workflow agents" },
  { name: "Teregon Equinox", href: "/#offerings", detail: "Forecasting and planning" },
  { name: "Teregon Terra", href: "/water.html#watershed-context", detail: "Land and watershed systems" },
];

function ProductLinks() {
  return products.map((product) => (
    <Link className="product-menu-link" href={product.href} key={product.name}>
      <span>{product.name}</span>
      <small>{product.detail}</small>
    </Link>
  ));
}

export function SiteHeader({ active }: { active?: string }) {
  const isActive = (page: string) => (active === page ? { "aria-current": "page" as const } : {});

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-header-inner">
        <Link className="site-brand" href="/" aria-label="Teregon Labs home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>Teregon</strong><small>LABS</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/work.html" {...isActive("work")}>Work</Link>
          <Link href="/approach.html" {...isActive("approach")}>Approach</Link>
          <details className="products-dropdown">
            <summary>Products <span aria-hidden="true">⌄</span></summary>
            <div className="products-menu"><ProductLinks /></div>
          </details>
          <Link href="/about.html" {...isActive("about")}>About</Link>
        </nav>

        <Link className="header-cta" href="/#contact">Start a conversation <span aria-hidden="true">↗</span></Link>

        <details className="mobile-nav">
          <summary aria-label="Open navigation menu"><span className="menu-lines" aria-hidden="true" /><span className="mobile-nav-label">Menu</span></summary>
          <nav className="mobile-menu-panel" aria-label="Mobile navigation">
            <Link href="/work.html" {...isActive("work")}>Work <span aria-hidden="true">↗</span></Link>
            <Link href="/approach.html" {...isActive("approach")}>Approach <span aria-hidden="true">↗</span></Link>
            <div className="mobile-products">
              <p>Products</p>
              <ProductLinks />
            </div>
            <Link href="/about.html" {...isActive("about")}>About <span aria-hidden="true">↗</span></Link>
            <Link className="mobile-menu-cta" href="/#contact">Start a conversation <span aria-hidden="true">↗</span></Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link className="site-brand footer-brand" href="/" aria-label="Teregon Labs home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>Teregon</strong><small>LABS</small></span>
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/work.html">Work</Link>
          <Link href="/approach.html">Approach</Link>
          <Link href="/about.html">About</Link>
          <Link href="/water.html">Aqua</Link>
        </nav>
        <a className="footer-email" href="mailto:hello@teregonlabs.com">hello@teregonlabs.com ↗</a>
        <small className="copyright">© 2026 TEREGON LABS</small>
      </div>
    </footer>
  );
}
