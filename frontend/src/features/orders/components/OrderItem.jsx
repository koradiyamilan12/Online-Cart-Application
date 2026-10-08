import { FiShoppingBag } from "react-icons/fi";
import { formatCurrency } from "@/lib/utils";

function OrderItem({ item }) {
  const unitPrice = Number(item?.unitPrice ?? item?.price ?? 0);
  const quantity = Number(item?.quantity ?? 0);
  const lineTotal = Number(item?.lineTotal ?? unitPrice * quantity);

  return (
    <article className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:gap-4">
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand-700 ring-1 ring-slate-100"
      >
        <FiShoppingBag className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">
          {item?.productName ?? item?.name ?? "Product"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Qty {quantity} · {formatCurrency(unitPrice)} each
        </p>
      </div>
      <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-950">
        {formatCurrency(lineTotal)}
      </p>
    </article>
  );
}

export default OrderItem;
