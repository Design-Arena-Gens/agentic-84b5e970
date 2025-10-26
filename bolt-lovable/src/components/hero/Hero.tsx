import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-bolt-500 via-bolt-600 to-midnight px-8 py-16 text-white shadow-[0_20px_60px_-30px_rgba(10,34,57,0.65)] sm:px-14">
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[160px]" />
      </div>
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="badge bg-white/90 text-slate-900">
            <Sparkles size={16} className="text-bolt-500" />
            Multi-AI orchestration for ship-ready UIs
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Bolt Lovable empowers teams to design, orchestrate, and deploy lovable experiences faster.
          </h1>
          <p className="text-lg text-white/80 sm:text-xl">
            Compose templates, co-create with orchestrated AI teammates, and stay aligned with Supabase-powered
            realtime collaboration—all in one modern studio.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#templates"
              className="inline-flex items-center justify-center rounded-full bg-white/95 px-6 py-3 text-sm font-semibold text-bolt-600 shadow-lg shadow-bolt-900/30 transition hover:bg-white"
            >
              Explore Template Library
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link
              href="#workflow"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/25"
            >
              View AI Orchestration Studio
            </Link>
          </div>
        </div>
        <div className="glass-card relative w-full max-w-md overflow-hidden border-white/20 bg-white/10">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 text-xs uppercase tracking-widest text-white/60">
            <span>Live Experience Metrics</span>
            <span>Last synced · 2m</span>
          </div>
          <div className="grid gap-4 px-6 py-6">
            <div>
              <span className="text-sm text-white/70">Team Velocity</span>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-semibold">94</span>
                <span className="text-xs text-emerald-300">+12 from last cycle</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-white/70">AI-assisted Commits</span>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <div className="flex h-10 flex-1 items-center gap-1 rounded-full bg-white/10 px-3">
                  <span className="h-2 flex-1 rounded-full bg-emerald-400/90" />
                  <span className="h-2 w-[18%] rounded-full bg-amber-300/80" />
                  <span className="h-2 w-[12%] rounded-full bg-rose-300/80" />
                </div>
                <span>82%</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-white/70">Supabase Realtime Rooms</span>
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                {["Templates", "Workflow", "Deploy"].map((room) => (
                  <span
                    key={room}
                    className="rounded-full bg-white/10 px-3 py-2 text-center text-xs font-medium text-white/70"
                  >
                    {room}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
