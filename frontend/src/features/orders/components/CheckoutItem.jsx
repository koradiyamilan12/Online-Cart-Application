import { formatCurrency } from "@/lib/utils";

function CheckoutItem({ item }) {
  const unitPrice = Number(item?.price ?? item?.unitPrice ?? 0);
  const quantity = Number(item?.quantity ?? 0);
  const lineTotal = Number(item?.lineTotal ?? unitPrice * quantity);

  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-4 last:border-b-0 last:pb-0 first:pt-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{item?.name ?? item?.productName ?? "Product"}</p>
        <p className="mt-1 text-xs text-slate-500">Qty {quantity} × {formatCurrency(unitPrice)}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-slate-900">{formatCurrency(lineTotal)}</p>
      </div>
    </div>
  );
}

export default CheckoutItem;
