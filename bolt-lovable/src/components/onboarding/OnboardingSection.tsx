import { GraduationCap, PlayCircle, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { onboardingSteps } from "@/lib/data";

export function OnboardingSection() {
  return (
    <section id="onboarding" className="space-y-8">
      <SectionHeading
        eyebrow="Onboarding"
        title="Interactive tutorials get every teammate ship-ready"
        description="Step-by-step walkthroughs, guided workflows, and embedded documentation tailored to your role."
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-card space-y-4 p-6">
          {onboardingSteps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
                <span>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}. {step.title}
                </span>
                <span className="rounded-full bg-bolt-500/10 px-3 py-1 text-[11px] font-semibold text-bolt-600">
                  {step.duration}
                </span>
              </div>
              <p className="text-sm text-slate-600">{step.description}</p>
              <button className="inline-flex items-center gap-2 text-xs font-semibold text-bolt-600">
                <PlayCircle size={14} />
                Launch tutorial
              </button>
            </div>
          ))}
        </div>
        <aside className="space-y-4">
          <div className="glass-card space-y-3 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <GraduationCap size={16} className="text-bolt-500" />
              Role-based journeys
            </div>
            <p className="text-xs text-slate-500">
              Bolt Lovable adapts the onboarding path for creators, developers, and reviewers with contextual AI tips.
            </p>
          </div>
          <div className="glass-card space-y-3 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <BookOpen size={16} className="text-bolt-500" />
              Embedded docs
            </div>
            <p className="text-xs text-slate-500">
              Documentation is embedded throughout the workspace with contextual callouts and AI-suggested follow ups.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
