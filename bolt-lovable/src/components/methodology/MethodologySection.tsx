import { Compass, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { methodology } from "@/lib/data";

export function MethodologySection() {
  return (
    <section id="methodology" className="space-y-8">
      <SectionHeading
        eyebrow="Methodology"
        title="Blueprint for crafting lovable experiences"
        description="Bolt Lovable takes inspiration from Bolt's proven approach—discover, build, debug, and ship—while introducing AI-assisted orchestration and Supabase observability."
      />
      <div className="glass-card grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
        {methodology.map((step, index) => (
          <div
            key={step.id}
            className="group flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
              <span>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}. {step.title}
              </span>
              <Compass size={14} className="text-bolt-500" />
            </div>
            <p className="text-sm text-slate-600">{step.description}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="rounded-full bg-bolt-500/10 px-3 py-1 text-xs font-semibold text-bolt-600">
                {step.signal}
              </span>
              <ArrowRight size={16} className="text-slate-400 transition group-hover:text-bolt-600" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
