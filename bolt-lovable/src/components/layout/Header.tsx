import Link from "next/link";
import { Menu, Rocket } from "lucide-react";

const navItems = [
  { href: "#templates", label: "Template Library" },
  { href: "#workflow", label: "AI Orchestration" },
  { href: "#workspace", label: "Workspace" },
  { href: "#collaboration", label: "Collaboration" },
  { href: "#community", label: "Community" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-b-3xl border border-bolt-50/80 bg-white/80 px-6 py-4 shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-bolt-600">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bolt-500/10 text-bolt-600">
            <Rocket size={20} />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-slate-600">Bolt</span>
            <span className="text-lg font-semibold text-slate-900">Lovable</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-bolt-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#workflow"
            className="rounded-full border border-bolt-500/40 px-4 py-2 text-sm font-semibold text-bolt-600 transition hover:bg-bolt-500/10"
          >
            Launch Studio
          </Link>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-500 md:hidden">
          <Menu />
          <span className="sr-only">Open navigation</span>
        </button>
      </div>
    </header>
  );
}
