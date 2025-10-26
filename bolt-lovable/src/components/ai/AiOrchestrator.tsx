"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Brain, Play, RefreshCcw, ToggleLeft, Activity } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { aiModules } from "@/lib/data";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useOrchestratorStore, type WorkflowNode } from "@/store/useOrchestratorStore";

export function AiOrchestrator() {
  const { nodes, reorderNode, setNodeState, resetWorkflow } = useOrchestratorStore();
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [isRunning, setIsRunning] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [presenceCount, setPresenceCount] = useState(1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  );

  useEffect(() => {
    const channel = supabase.channel("presence:workflow", {
      config: { presence: { key: `orchestrator-${Math.random().toString(36).slice(2, 7)}` } },
    });

    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      setPresenceCount(Object.keys(state).length || 1);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ activeNode: nodes[0]?.moduleId ?? "architect" });
      }
    });

    return () => {
      void channel.unsubscribe();
    };
  }, [supabase, nodes]);

  useEffect(() => {
    if (!isRunning) return;
    let cancelled = false;

    const execute = async () => {
      for (const node of nodes) {
        if (cancelled) break;
        setNodeState(node.id, "running", `${node.label} initiated`);
        await wait(700 + Math.random() * 900);

        setNodeState(node.id, "success", `${node.label} completed`);
        setDurations((prev) => ({
          ...prev,
          [node.id]: Math.floor(Math.random() * 120 + 60),
        }));
      }
      setIsRunning(false);
    };

    execute().catch(() => setIsRunning(false));

    return () => {
      cancelled = true;
    };
  }, [isRunning, nodes, setNodeState]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = nodes.findIndex((node) => node.id === active.id);
    const newIndex = nodes.findIndex((node) => node.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const sorted = arrayMove(nodes, oldIndex, newIndex);
    sorted.forEach((node, index) => reorderNode(node.id, index));
  };

  const handleRun = () => {
    setDurations({});
    setIsRunning(true);
  };

  const handleReset = () => {
    resetWorkflow();
    setDurations({});
  };

  return (
    <section id="workflow" className="space-y-8">
      <SectionHeading
        eyebrow="Multi-AI Orchestration"
        title="Visual workflow studio for Architect, Coder, Debugger, and Error Handler"
        description="Drag, reorder, and observe your AI teammates as they collaborate on experience delivery. Every module is observable with real-time Supabase logs and guardrails."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-bolt-600"
            >
              <RefreshCcw size={16} />
              Reset canvas
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="inline-flex items-center gap-2 rounded-full bg-bolt-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-bolt-600/40 transition hover:bg-bolt-500 disabled:cursor-not-allowed disabled:bg-bolt-400"
            >
              <Play size={16} />
              {isRunning ? "Running" : "Simulate run"}
            </button>
          </div>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-card space-y-5 p-6">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-bolt-500/5 px-4 py-3 text-sm text-bolt-600">
            <Brain size={18} />
            <span>Every drag triggers a Supabase realtime broadcast to connected teammates.</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-bolt-600">
              {presenceCount} online
            </span>
          </div>
          <DndContext sensors={sensors} onDragEnd={onDragEnd}>
            <SortableContext items={nodes.map((node) => node.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {nodes.map((node) => (
                  <SortableModuleCard key={node.id} node={node} duration={durations[node.id]} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        <aside className="space-y-4">
          {aiModules.map((module) => (
            <div
              key={module.id}
              className="glass-card overflow-hidden border border-bolt-500/10 bg-gradient-to-br from-white to-white/40 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{module.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{module.description}</p>
                </div>
                <span className="rounded-full bg-bolt-500/10 px-3 py-1 text-xs font-medium text-bolt-600">
                  {module.metrics.coverage}% coverage
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-600">
                <MetricPill label="Latency" value={`${module.metrics.latency}ms`} />
                <MetricPill label="Confidence" value={`${Math.round(module.metrics.confidence * 100)}%`} />
                <MetricPill label="Signals" value="+32" />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

type SortableModuleProps = {
  node: WorkflowNode;
  duration?: number;
};

function SortableModuleCard({ node, duration }: SortableModuleProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: node.id,
  });
  const aiModule = aiModules.find((item) => item.id === node.moduleId)!;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative overflow-hidden rounded-3xl border ${
        isDragging ? "border-bolt-500/60 shadow-lg" : "border-slate-200"
      } bg-white/90 p-5 transition`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr opacity-80 transition group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>{aiModule.name}</span>
            <ToggleLeft size={14} className="text-slate-300 transition group-hover:text-bolt-600" />
          </div>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{node.label}</h3>
          <p className="mt-2 text-sm text-slate-600">{aiModule.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={node.state} />
          <button
            className="rounded-full border border-slate-200 bg-white/30 px-3 py-2 text-xs font-medium text-slate-500"
            {...listeners}
            {...attributes}
          >
            Drag to reorder
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 text-xs text-slate-500">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/60">
          <span
            className={`block h-full rounded-full bg-gradient-to-r from-bolt-400 via-bolt-500 to-bolt-600 transition-all duration-500 ${
              node.state === "idle"
                ? "w-[6%]"
                : node.state === "running"
                  ? "w-2/3"
                  : "w-full"
            }`}
          />
        </div>
        <span className="flex items-center gap-2">
          <Activity size={14} className="text-bolt-500" />
          Run logs mirrored to Supabase
        </span>
        {duration ? <span>Latency {duration} ms</span> : null}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: WorkflowNode["state"] }) {
  const styles: Record<WorkflowNode["state"], string> = {
    idle: "bg-slate-200/60 text-slate-600",
    running: "bg-amber-50 text-amber-600",
    success: "bg-emerald-50 text-emerald-600",
    error: "bg-rose-50 text-rose-600",
  };

  const labels: Record<WorkflowNode["state"], string> = {
    idle: "Idle",
    running: "Executing",
    success: "Complete",
    error: "Error",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-bolt-500/20 bg-white/80 px-3 py-2">
      <span className="block text-[11px] font-medium text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

const wait = (duration: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
