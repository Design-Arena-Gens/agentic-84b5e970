type StatCardProps = {
  title: string;
  value: string;
  change?: string;
  icon?: React.ReactNode;
};

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="glass-card flex h-full flex-col gap-3 px-6 py-5">
      <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
        <span>{title}</span>
        {icon}
      </div>
      <div className="text-3xl font-semibold text-slate-900">{value}</div>
      {change ? (
        <span className="text-sm font-medium text-emerald-500">{change}</span>
      ) : null}
    </div>
  );
}
