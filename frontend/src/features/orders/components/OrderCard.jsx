import { FiChevronRight, FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/lib/utils";

function OrderCard({ order }) {
  const orderDate = order?.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }) : "—";

  const orderDetailPath = ROUTES.ORDER_DETAILS.replace(":orderId", String(order?.id ?? ""));

  return (
    <Link className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50/40" to={orderDetailPath}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">Order #{order?.id ?? "—"}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{formatCurrency(order?.totalAmount ?? 0)}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
          View details
          <FiChevronRight aria-hidden="true" className="size-4" />
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <FiPackage aria-hidden="true" className="size-4" />
          Order placed
        </span>
        <span>{orderDate}</span>
      </div>
    </Link>
  );
}

export default OrderCard;
