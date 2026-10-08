import { formatCurrency } from "@/lib/utils";

function OrderItem({ item }) {
  const unitPrice = Number(item?.unitPrice ?? item?.price ?? 0);
  const quantity = Number(item?.quantity ?? 0);
  const lineTotal = Number(item?.lineTotal ?? unitPrice * quantity);

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-medium text-slate-900">{item?.productName ?? item?.name ?? "Product"}</p>
          <p className="mt-1 text-sm text-slate-500">Quantity: {quantity}</p>
        </div>
        <p className="text-base font-semibold text-slate-900">{formatCurrency(lineTotal)}</p>
      </div>
      <p className="mt-2 text-sm text-slate-500">Unit price: {formatCurrency(unitPrice)}</p>
    </div>
  );
}

export default OrderItem;
