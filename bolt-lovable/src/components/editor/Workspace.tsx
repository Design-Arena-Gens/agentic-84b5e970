"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Clock, GitBranch, Save, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { codeSnippets } from "@/lib/data";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function Workspace() {
  const [selectedSnippet, setSelectedSnippet] = useState(codeSnippets[0]);
  const [code, setCode] = useState(selectedSnippet.content);

  const handleSelect = (snippetId: string) => {
    const snippet = codeSnippets.find((item) => item.id === snippetId);
    if (!snippet) return;
    setSelectedSnippet(snippet);
    setCode(snippet.content);
  };

  return (
    <section id="workspace" className="space-y-8">
      <SectionHeading
        eyebrow="Realtime Workspace"
        title="Code editor with AI-assisted version control"
        description="Powered by Monaco, connected to Supabase auth, and designed for real-time pair building. Version snapshots sync to Git while AI companions annotate deltas."
        actions={
          <button className="inline-flex items-center gap-2 rounded-full border border-bolt-500/40 bg-bolt-500/10 px-4 py-2 text-sm font-semibold text-bolt-600 transition hover:bg-bolt-500/20">
            <Save size={16} />
            Commit to Git
          </button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="glass-card flex flex-col">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-900">Version Timeline</h3>
            <p className="text-xs text-slate-500">
              Supabase realtime mirrors collaborator cursors across the editor.
            </p>
          </div>
          <div className="flex-1 space-y-1 px-3 py-4">
            {codeSnippets.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => handleSelect(snippet.id)}
                className={`w-full rounded-2xl px-3 py-3 text-left transition ${
                  snippet.id === selectedSnippet.id
                    ? "bg-bolt-500/10 text-bolt-600"
                    : "text-slate-600 hover:bg-slate-100/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{snippet.title}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={12} />
                    {snippet.updatedAt}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <GitBranch size={12} />
                  {snippet.version}
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-slate-500">{snippet.author}</p>
              </button>
            ))}
          </div>
        </aside>
        <div className="glass-card overflow-hidden border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/60 px-5 py-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                Live
              </span>
              <span>main · apps/studio/workflow.tsx</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Supabase sync</span>
              <ChevronRight size={12} />
              <span>Vercel staging deploy ready</span>
            </div>
          </div>
          <MonacoEditor
            height="420px"
            language={selectedSnippet.language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              smoothScrolling: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "on",
            }}
          />
        </div>
      </div>
    </section>
  );
}
