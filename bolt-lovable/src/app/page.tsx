import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { TemplateLibrary } from "@/components/templates/TemplateLibrary";
import { TemplateComposer } from "@/components/templates/TemplateComposer";
import { AiOrchestrator } from "@/components/ai/AiOrchestrator";
import { Workspace } from "@/components/editor/Workspace";
import { DatabaseSection } from "@/components/database/DatabaseSection";
import { CollaborationPanel } from "@/components/collaboration/CollaborationPanel";
import { DeploymentSection } from "@/components/deployment/DeploymentSection";
import { OnboardingSection } from "@/components/onboarding/OnboardingSection";
import { CommunitySection } from "@/components/forum/CommunitySection";
import { BlogShowcase } from "@/components/blog/BlogShowcase";
import { MethodologySection } from "@/components/methodology/MethodologySection";
import { LeaderboardSection } from "@/components/leaderboard/LeaderboardSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f4f7fb] pb-20">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-12 sm:px-10">
        <Hero />
        <LeaderboardSection />
        <TemplateLibrary />
        <TemplateComposer />
        <AiOrchestrator />
        <Workspace />
        <DatabaseSection />
        <CollaborationPanel />
        <DeploymentSection />
        <OnboardingSection />
        <CommunitySection />
        <BlogShowcase />
        <MethodologySection />
      </main>
      <Footer />
    </div>
  );
}
