import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { blogPosts } from "@/lib/data";

export function BlogShowcase() {
  return (
    <section id="blog" className="space-y-8">
      <SectionHeading
        eyebrow="Stories & Signals"
        title="Learn how the best teams ship lovable experiences"
        description="Deep dives, orchestration case studies, and Supabase tactics from the Bolt Lovable community."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.id} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover brightness-95 transition duration-500 group-hover:scale-105 group-hover:brightness-100"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 px-5 py-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                {post.tags.join(" · ")}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
              <p className="text-sm text-slate-600">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                <span>
                  {post.author} · {post.readingTime} min read
                </span>
                <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-medium text-slate-500 transition group-hover:text-bolt-600">
                  Read
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
