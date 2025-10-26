import Image from "next/image";
import { Trophy, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { leaderboard } from "@/lib/data";

export function LeaderboardSection() {
  return (
    <section id="leaderboard" className="space-y-8">
      <SectionHeading
        eyebrow="Leaderboards"
        title="Celebrate the teams shipping lovable experiences"
        description="Track shipped templates, bugs resolved, and orchestration velocity across teams in real time."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600">
            <TrendingUp size={14} />
            Velocity recalculates every minute
          </span>
        }
      />
      <div className="glass-card overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 text-xs uppercase tracking-[0.18em] text-slate-500">
          <span className="flex items-center gap-2">
            <Trophy size={14} className="text-bolt-500" />
            Global leaderboard
          </span>
          <span>Templates · Bugs · Velocity score</span>
        </div>
        <div className="divide-y divide-slate-200">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm text-slate-700 transition hover:bg-bolt-500/5"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-bolt-500">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                <div className="flex items-center gap-3">
                  <Image src={entry.avatar} alt={entry.name} width={44} height={44} className="h-11 w-11 rounded-full" />
                  <div>
                    <p className="text-base font-semibold text-slate-900">{entry.name}</p>
                    <p className="text-xs text-slate-400">
                      {entry.role} · {entry.team}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-end gap-8 text-xs uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-slate-100/60 px-3 py-2 text-slate-900">
                  Templates {entry.templatesPublished}
                </span>
                <span className="rounded-full bg-slate-100/60 px-3 py-2 text-slate-900">
                  Bugs {entry.bugsResolved}
                </span>
                <span className="rounded-full bg-bolt-500/10 px-3 py-2 text-bolt-600">
                  Velocity {entry.velocity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
