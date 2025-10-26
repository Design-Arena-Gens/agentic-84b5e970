import { Users, ShieldCheck, Share2, Lock, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatCard } from "@/components/shared/StatCard";

const roles = [
  {
    id: "creator",
    name: "Experience Creator",
    description: "Compose templates, orchestrate AI modules, push deploy previews.",
    permissions: ["Workflow edit", "Supabase schema sync", "AI run triggers"],
  },
  {
    id: "developer",
    name: "Developer",
    description: "Refine code, manage Git branches, integrate with Supabase.",
    permissions: ["Git operations", "Schema migrations", "Deploy approvals"],
  },
  {
    id: "reviewer",
    name: "Reviewer",
    description: "Review experiences, annotate, approve releases.",
    permissions: ["Commenting", "Run simulations", "Deployment approvals"],
  },
];

export function CollaborationPanel() {
  return (
    <section id="collaboration" className="space-y-8">
      <SectionHeading
        eyebrow="Collaboration"
        title="Roles, permissions, and realtime presence"
        description="Supabase Auth powers team workspaces with row-level security. Invite teammates, assign roles, and stay in sync through shared workstreams."
        actions={
          <button className="inline-flex items-center gap-2 rounded-full border border-bolt-500/40 bg-bolt-500/10 px-4 py-2 text-sm font-semibold text-bolt-600 transition hover:bg-bolt-500/20">
            <Share2 size={16} />
            Share workspace
          </button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="glass-card flex flex-col gap-5 p-6">
          <div className="flex items-center gap-3 rounded-2xl bg-bolt-500/10 px-4 py-3 text-sm text-bolt-600">
            <Users size={16} />
            34 teammates online right now
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard title="Active sessions" value="21" change="+8%" />
            <StatCard title="Shared templates" value="146" change="+12%" />
          </div>
          <div className="rounded-2xl bg-slate-100/60 px-4 py-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">Presence channels:</span> Supabase realtime broadcasts
            cursor positions, active nodes, and module output signals across the workspace.
          </div>
        </div>
        <div className="space-y-5">
          <div className="glass-card grid gap-5 p-6 sm:grid-cols-2">
            {roles.map((role) => (
              <div key={role.id} className="space-y-3 rounded-2xl border border-slate-200 bg-white/60 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
                  <span>{role.name}</span>
                  <Lock size={12} />
                </div>
                <p className="text-sm text-slate-600">{role.description}</p>
                <ul className="space-y-2 text-xs text-slate-500">
                  {role.permissions.map((permission) => (
                    <li key={permission} className="rounded-full bg-slate-100/60 px-3 py-2">
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="glass-card grid gap-4 p-6 sm:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">Supabase Auth</h3>
              <p className="text-xs text-slate-500">
                OAuth, magic links, passkeys, and multi-tenant policies protecting every workspace.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600">
                <ShieldCheck size={14} />
                Row-level security templates included
              </div>
              <div className="flex items-center gap-2 rounded-full bg-bolt-500/10 px-3 py-2 text-xs text-bolt-600">
                <MessageSquare size={14} />
                Threaded comments with AI summaries
              </div>
            </div>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <span>Realtime operations:</span>
              <div className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
                presence: workflow-room
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
                broadcast: template-updates
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
                postgres_changes: deployments
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
