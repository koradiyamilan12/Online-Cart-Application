import { FiShoppingBag } from "react-icons/fi";
import { formatCurrency } from "@/lib/utils";

function CheckoutItem({ item }) {
  const unitPrice = Number(item?.price ?? item?.unitPrice ?? 0);
  const quantity = Number(item?.quantity ?? 0);
  const lineTotal = Number(item?.lineTotal ?? unitPrice * quantity);
  const name = item?.name ?? item?.productName ?? "Product";

  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-b-0 last:pb-1 first:pt-4 sm:gap-4">
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"
      >
        <FiShoppingBag className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
        <p className="mt-1 text-xs text-slate-500">
          Qty {quantity} · {formatCurrency(unitPrice)} each
        </p>
      </div>
      <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
        {formatCurrency(lineTotal)}
      </p>
    </div>
  );
}

export default CheckoutItem;
