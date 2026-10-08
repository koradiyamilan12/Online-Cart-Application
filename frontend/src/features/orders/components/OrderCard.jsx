import { FiArrowUpRight, FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/lib/utils";

function OrderCard({ order }) {
  const orderDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
  const orderDetailPath = ROUTES.ORDER_DETAILS.replace(
    ":orderId",
    String(order?.id ?? ""),
  );
  const itemCount = Array.isArray(order?.items)
    ? order.items.reduce((sum, item) => sum + Number(item?.quantity ?? 0), 0)
    : null;

  return (
    <Link
      className="group block rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition-[transform,border-color,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_10px_28px_rgba(26,32,55,0.07)] focus-visible:ring-2 focus-visible:ring-brand-500/30 sm:p-6"
      to={orderDetailPath}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700"
        >
          <FiPackage className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold tracking-tight text-slate-950">
            Order #{order?.id ?? "—"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {orderDate}
            {itemCount !== null
              ? ` · ${itemCount} ${itemCount === 1 ? "item" : "items"}`
              : ""}
          </p>
        </div>
        <p className="text-lg font-semibold tabular-nums tracking-tight text-slate-950 sm:text-right">
          {formatCurrency(order?.totalAmount ?? 0)}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-800">
          View order{" "}
          <FiArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export default OrderCard;
