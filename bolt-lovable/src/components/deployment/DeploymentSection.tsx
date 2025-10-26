import { Terminal, Server, Send } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { deploymentVendors } from "@/lib/data";

const commands = [
  "pnpm bolt orchestrate --plan=lovable",
  "pnpm supabase db push",
  "vercel deploy --prod --token ********",
];

export function DeploymentSection() {
  return (
    <section id="deployment" className="space-y-8">
      <SectionHeading
        eyebrow="Hosting & Deployment"
        title="Deploy to Vercel, Netlify, or your cloud in a single command"
        description="Provision environment variables, validate Supabase connectivity, and trigger one-click deploys. Bolt Lovable keeps your orchestration pipeline production-ready."
        actions={
          <button className="inline-flex items-center gap-2 rounded-full border border-bolt-500/40 bg-bolt-500/10 px-4 py-2 text-sm font-semibold text-bolt-600 transition hover:bg-bolt-500/20">
            <Send size={16} />
            Trigger deploy
          </button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-card space-y-5 p-6">
          <div className="rounded-3xl bg-slate-100/60 p-4 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">CLI Pipeline</span>
            <ul className="mt-3 space-y-2 text-sm text-bolt-600">
              {commands.map((command) => (
                <li key={command} className="rounded-2xl bg-bolt-500/10 px-3 py-2 font-mono text-[11px]">
                  {command}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/50 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
              <span>Deployment Quality Gates</span>
              <Server size={14} />
            </div>
            <div className="mt-4 grid gap-3 text-xs text-slate-500 sm:grid-cols-3">
              <span className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
                Lighthouse ≥ 95
              </span>
              <span className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
                Supabase migrations applied
              </span>
              <span className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
                AI regression suite green
              </span>
            </div>
          </div>
        </div>
        <aside className="space-y-4">
          {deploymentVendors.map((vendor) => (
            <div key={vendor.id} className="glass-card space-y-3 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{vendor.name}</h3>
                <span className="rounded-full bg-bolt-500/10 px-3 py-1 text-xs font-medium text-bolt-600">
                  1-click
                </span>
              </div>
              <p className="text-sm text-slate-600">{vendor.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-bolt-600">
                {vendor.guides.map((guide) => (
                  <span key={guide} className="rounded-full bg-bolt-500/10 px-3 py-1">
                    {guide}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="glass-card rounded-3xl border border-slate-200 bg-gradient-to-r from-bolt-500/15 to-bolt-600/15 p-5 text-sm text-slate-600">
            <Terminal size={16} className="text-bolt-500" />
            <p className="mt-3">
              Bolt Lovable validates environment variables, Supabase availability, and AI workflow coverage before
              promoting to production.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
