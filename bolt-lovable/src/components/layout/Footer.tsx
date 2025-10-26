import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Template Library", href: "#templates" },
      { label: "AI Orchestration", href: "#workflow" },
      { label: "Workspace", href: "#workspace" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Supabase Integration", href: "#database" },
      { label: "Deployments", href: "#deployment" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#onboarding" },
      { label: "Blog", href: "#blog" },
      { label: "Methodology", href: "#methodology" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 rounded-t-3xl bg-midnight px-6 py-10 text-white sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">Bolt Lovable</span>
            <h3 className="text-xl font-semibold">Ship lovable experiences faster.</h3>
            <p className="text-sm text-white/70">
              Curated templates, multi-AI orchestration, and Supabase collaboration in a single studio.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link className="transition hover:text-white" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Bolt Lovable. Crafted for builders worldwide.</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition hover:text-white/80">
              Terms
            </Link>
            <Link href="#" className="transition hover:text-white/80">
              Privacy
            </Link>
            <Link href="#" className="transition hover:text-white/80">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
