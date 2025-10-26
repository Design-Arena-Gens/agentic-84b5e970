"use client";

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Palette, Settings2, X } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const buildingBlocks = [
  { id: "hero", name: "Hero Showcase", description: "Above the fold hero with CTA and metrics." },
  { id: "features", name: "Feature Grid", description: "3-column responsive features grid." },
  { id: "testimonials", name: "Testimonials", description: "Carousel of customer love and social proof." },
  { id: "pricing", name: "Pricing Plans", description: "Flexible table with toggles and add-ons." },
  { id: "cta", name: "Call To Action", description: "High-converting CTA targeting signups." },
  { id: "faq", name: "FAQ Accordion", description: "Expandable sections for key questions." },
];

type BlockDefinition = (typeof buildingBlocks)[number];

export function TemplateComposer() {
  const [blocks, setBlocks] = useState<BlockDefinition[]>(buildingBlocks);
  const [openSettings, setOpenSettings] = useState(false);
  const [theme, setTheme] = useState("Bolt Blue");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);
    setBlocks((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <section id="composer" className="space-y-8">
      <SectionHeading
        eyebrow="Template Composer"
        title="Drag-and-drop sections to customize your template"
        description="Experiment with layout flows, preview responsive variants, and sync changes to Supabase projects."
        actions={
          <button
            onClick={() => setOpenSettings(true)}
            className="inline-flex items-center gap-2 rounded-full border border-bolt-500/40 bg-bolt-500/10 px-4 py-2 text-sm font-semibold text-bolt-600 transition hover:bg-bolt-500/20"
          >
            <Settings2 size={16} />
            Advanced settings
          </button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="glass-card space-y-3 p-6">
          <div className="flex items-center gap-3 rounded-2xl bg-bolt-500/10 px-4 py-3 text-sm text-bolt-600">
            <Palette size={16} />
            Theme · {theme}
          </div>
          <p className="text-xs text-slate-500">
            Drag sections to adjust the order. Changes propagate instantly across responsive breakpoints.
          </p>
        </div>
        <div className="glass-card p-6">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {blocks.map((block, index) => (
                  <SortableBlock key={block.id} block={block} index={index + 1} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
      {openSettings ? (
        <Modal onClose={() => setOpenSettings(false)}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Advanced template settings</h3>
            <div className="space-y-3">
              <label className="flex flex-col gap-2 text-sm text-slate-600">
                Primary accent
                <select
                  value={theme}
                  onChange={(event) => setTheme(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 outline-none"
                >
                  <option>Bolt Blue</option>
                  <option>Pulse Violet</option>
                  <option>Sunrise Amber</option>
                  <option>Evergreen</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-600">
                Grid density
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={58}
                  className="accent-bolt-500"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-600">
                Enable AI copy refresh
                <input type="checkbox" className="size-4 accent-bolt-500" defaultChecked />
              </label>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setOpenSettings(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600"
              >
                Cancel
              </button>
              <button className="rounded-full bg-bolt-600 px-4 py-2 text-sm font-semibold text-white">
                Save changes
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}

function SortableBlock({ block, index }: { block: BlockDefinition; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between gap-4 rounded-3xl border ${
        isDragging ? "border-bolt-500/60 shadow-lg" : "border-slate-200"
      } bg-white/80 px-5 py-4 transition`}
      {...listeners}
      {...attributes}
    >
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Section {index}</div>
        <h3 className="text-base font-semibold text-slate-900">{block.name}</h3>
        <p className="text-xs text-slate-500">{block.description}</p>
      </div>
      <span className="rounded-full bg-bolt-500/10 px-3 py-1 text-xs font-semibold text-bolt-600">
        Drag
      </span>
    </div>
  );
}

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
    >
      <div className="glass-card relative w-full max-w-lg bg-white/95 p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-400"
        >
          <X size={16} />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}
