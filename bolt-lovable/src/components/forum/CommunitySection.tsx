import { MessageCircle, Flame, Award } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { communityThreads } from "@/lib/data";

export function CommunitySection() {
  return (
    <section id="community" className="space-y-8">
      <SectionHeading
        eyebrow="Community Forum"
        title="Connect with the builders making Bolt Lovable better"
        description="Share templates, orchestrate AI best practices, and get feedback from the community. Threads update in real time via Supabase."
        actions={
          <button className="inline-flex items-center gap-2 rounded-full border border-bolt-500/40 bg-bolt-500/10 px-4 py-2 text-sm font-semibold text-bolt-600 transition hover:bg-bolt-500/20">
            <MessageCircle size={16} />
            Start a thread
          </button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-card divide-y divide-slate-200 overflow-hidden">
          {communityThreads.map((thread) => (
            <article
              key={thread.id}
              className="flex flex-col gap-3 px-6 py-5 transition hover:bg-bolt-500/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-900">{thread.title}</h3>
                <span className="rounded-full bg-slate-100/60 px-3 py-1 text-xs text-slate-500">
                  {thread.lastActivity}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-bolt-500/10 px-3 py-1 font-medium text-bolt-600">
                  {thread.author}
                </span>
                <span className="rounded-full bg-slate-100/60 px-3 py-1">{thread.replies} replies</span>
                {thread.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100/60 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <aside className="space-y-4">
          <div className="glass-card space-y-3 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Flame size={16} className="text-bolt-500" />
              Trending tags
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
              {["AI Orchestration", "Supabase", "Template Design", "Accessibility"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100/60 px-3 py-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-card space-y-3 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Award size={16} className="text-bolt-500" />
              Featured maker
            </div>
            <p className="text-xs text-slate-500">
              Indigo Stone shipped three AI-augmented education experiences this week and shared a Supabase RLS guide.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
