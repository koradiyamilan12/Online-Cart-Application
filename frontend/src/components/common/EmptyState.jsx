import { FiInbox } from "react-icons/fi";
import { cn } from "@/lib/utils";

function EmptyState({ className, title, description, action }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-[0_2px_8px_rgba(15,23,42,0.025)] sm:py-16",
        className,
      )}
    >
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
        <FiInbox aria-hidden="true" className="size-6" />
      </span>
      <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-950">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}

export default EmptyState;
