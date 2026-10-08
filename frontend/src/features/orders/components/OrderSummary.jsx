import { FiCalendar, FiPackage } from "react-icons/fi";
import { formatCurrency } from "@/lib/utils";

function OrderSummary({ createdAt, itemCount, totalAmount }) {
  const dateLabel = createdAt ? new Date(createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }) : "—";

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-600">Order summary</p>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <FiPackage aria-hidden="true" className="size-4" />
            Items
          </span>
          <span>{itemCount}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <FiCalendar aria-hidden="true" className="size-4" />
            Ordered on
          </span>
          <span>{dateLabel}</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </div>
    </aside>
  );
}

export default OrderSummary;
