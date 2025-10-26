"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Filter, Star, Layers } from "lucide-react";
import { Template, TemplateCategory, TemplateFeature, templates } from "@/lib/data";
import { SectionHeading } from "@/components/shared/SectionHeading";

const categories: TemplateCategory[] = [
  "SaaS",
  "E-commerce",
  "Portfolio",
  "Agency",
  "Marketing",
  "Community",
  "Education",
  "Startup",
];

const features: TemplateFeature[] = [
  "AI Assistant",
  "Analytics",
  "Live Chat",
  "Multi-language",
  "E-commerce",
  "Membership",
  "Blog",
  "CMS",
];

export function TemplateLibrary() {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "All">("All");
  const [selectedFeature, setSelectedFeature] = useState<TemplateFeature | "All">("All");

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesKeyword =
        keyword.length === 0 ||
        template.name.toLowerCase().includes(keyword.toLowerCase()) ||
        template.keywords.some((word) => word.toLowerCase().includes(keyword.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
      const matchesFeature =
        selectedFeature === "All" ||
        template.features.some((feature) => feature === selectedFeature);

      return matchesKeyword && matchesCategory && matchesFeature;
    });
  }, [keyword, selectedCategory, selectedFeature]);

  return (
    <section id="templates" className="space-y-8">
      <SectionHeading
        eyebrow="Template Library"
        title="Curated templates that accelerate lovable experiences"
        description="Search by industry, feature set, and design aesthetic. Every template ships with responsive layouts, accessibility baked in, and Supabase-ready data models."
        actions={
          <button className="inline-flex items-center gap-2 rounded-full border border-bolt-500/50 bg-bolt-500/10 px-4 py-2 text-sm font-semibold text-bolt-600 transition hover:bg-bolt-500/20">
            <Layers size={16} />
            Submit Template
          </button>
        }
      />
      <div className="grid gap-4 md:grid-cols-[320px_1fr]">
        <aside className="glass-card hidden h-full flex-col gap-6 p-6 md:flex">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
            <div className="mt-3 space-y-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                  selectedCategory === "All"
                    ? "bg-bolt-500/10 text-bolt-600"
                    : "text-slate-600 hover:bg-slate-100/60"
                }`}
              >
                All templates
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                    selectedCategory === category
                      ? "bg-bolt-500/10 text-bolt-600"
                      : "text-slate-600 hover:bg-slate-100/60"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Features</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                  selectedFeature === "All"
                    ? "bg-bolt-500/10 text-bolt-600"
                    : "text-slate-600 hover:bg-slate-100/60"
                }`}
                onClick={() => setSelectedFeature("All")}
              >
                Everything
              </button>
              {features.map((feature) => (
                <button
                  key={feature}
                  onClick={() => setSelectedFeature(feature)}
                  className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                    selectedFeature === feature
                      ? "bg-bolt-500/10 text-bolt-600"
                      : "text-slate-600 hover:bg-slate-100/60"
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        </aside>
        <div className="space-y-5">
          <div className="glass-card flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-2">
              <Search size={18} className="text-slate-400" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search 150+ lovingly crafted templates"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-bolt-600">
              <Filter size={16} />
              Smart filter
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-30px_rgba(10,34,57,0.65)] transition hover:-translate-y-1">
      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-r from-bolt-500/20 via-bolt-500/10 to-bolt-300/20">
        <Image
          src={template.previewUrl}
          alt={`${template.name} template preview`}
          fill
          className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <Star size={14} className="text-amber-300" />
          <span>{template.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 py-6">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
            <span className="rounded-full bg-bolt-500/10 px-3 py-1 text-xs font-medium text-bolt-600">
              {template.category}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{template.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {template.features.map((feature) => (
            <span key={feature} className="rounded-full bg-slate-100/60 px-3 py-1 text-xs text-slate-600">
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <Image
              src={template.author.avatar}
              alt={template.author.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">{template.author.name}</p>
              <p className="text-xs text-slate-500">Updated {template.updatedAt}</p>
            </div>
          </div>
          <button className="rounded-full border border-bolt-500/40 px-4 py-2 text-xs font-semibold text-bolt-600 transition hover:bg-bolt-500/10">
            Preview
          </button>
        </div>
      </div>
    </article>
  );
}
