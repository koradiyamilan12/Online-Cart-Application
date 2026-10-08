import { FiInbox } from "react-icons/fi";
import { cn } from "@/lib/utils";

function EmptyState({ className, title, description, action }) {
  return (
    <div className={cn("rounded-lg border border-dashed bg-white p-8 text-center", className)}>
      <FiInbox aria-hidden="true" className="mx-auto size-6 text-slate-400" />
      <h2 className="mt-4 text-base font-semibold text-slate-900">{title}</h2>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export default EmptyState;
