import { Database, Zap, Globe, Shield } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const schema = {
  templates: ["id", "name", "category", "features", "preview_url", "maintainer_id"],
  projects: ["id", "team_id", "template_id", "ai_config", "status", "updated_at"],
  configurations: ["id", "project_id", "workflow", "created_by", "version"],
};

export function DatabaseSection() {
  return (
    <section id="database" className="space-y-8">
      <SectionHeading
        eyebrow="Supabase Backbone"
        title="Secure data model for templates, projects, and AI orchestration"
        description="Supabase handles authentication, row-level security, and realtime updates. Every object in Bolt Lovable maps to versioned schemas so your team can scale safely."
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-card space-y-6 p-6">
          <div className="flex items-center gap-3 rounded-2xl bg-bolt-500/10 px-4 py-3 text-sm text-bolt-600">
            <Database size={16} />
            Supabase Database · PgVector · Row Level Security
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(schema).map(([table, columns]) => (
              <div key={table} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                  <span>{table}</span>
                  <Zap size={12} />
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {columns.map((column) => (
                    <li key={column} className="rounded-full bg-slate-100/60 px-3 py-2 text-xs">
                      {column}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="glass-card space-y-3 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Authentication</h3>
            <p className="text-xs text-slate-500">
              Supabase Auth powers multi-tenant workspaces with OAuth, passkeys, and team invitations.
            </p>
            <div className="rounded-2xl bg-bolt-500/10 px-3 py-2 text-xs font-semibold text-bolt-600">
              Policies: workspace_id = auth.uid()
            </div>
          </div>
          <div className="glass-card space-y-3 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Realtime Ingestion</h3>
            <p className="text-xs text-slate-500">
              Template edits stream over realtime channels; AI events push to analytics in under 200ms.
            </p>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <span className="rounded-2xl border border-slate-200 bg-white/70 px-3 py-2">
                <Globe size={12} className="mr-1 inline text-bolt-500" />
                broadcast: ai-events
              </span>
              <span className="rounded-2xl border border-slate-200 bg-white/70 px-3 py-2">
                <Shield size={12} className="mr-1 inline text-bolt-500" />
                row security applied to templates and projects
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
