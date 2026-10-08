import { cn } from "@/lib/utils";

function PageHeader({ eyebrow, title, description, action, className }) {
  return (
    <div className={cn("mb-8 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">{eyebrow}</p> : null}
        <h1 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-[2.35rem]">{title}</h1>
        {description ? <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export default PageHeader;
