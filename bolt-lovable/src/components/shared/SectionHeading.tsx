type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        {eyebrow ? (
          <span className="badge w-fit bg-bolt-50/60 text-bolt-600">{eyebrow}</span>
        ) : null}
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-base text-slate-700">{description}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
