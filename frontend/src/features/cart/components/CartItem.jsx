import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

function CartItem({
  item,
  isMutating,
  mutatingItemId,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const isUpdating = isMutating && mutatingItemId === item.id;

  return (
    <article
      aria-busy={isUpdating}
      className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition-shadow hover:shadow-sm sm:p-5"
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 sm:size-16"
        >
          <FiShoppingBag className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold tracking-tight text-slate-900">
            {item.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {formatCurrency(item.price)} <span className="text-xs">each</span>
          </p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-4">
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500">
                Quantity
              </p>
              <div
                aria-label={`Quantity for ${item.name}`}
                className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white"
                role="group"
              >
                <Button
                  aria-label={`Decrease ${item.name} quantity`}
                  className="size-11 rounded-xl text-slate-600"
                  disabled={item.quantity <= 1 || isMutating}
                  onClick={() => onDecrease(item.id)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <FiMinus aria-hidden="true" className="size-3.5" />
                </Button>
                <span
                  aria-live="polite"
                  className="min-w-8 text-center text-sm font-semibold tabular-nums text-slate-900"
                >
                  {item.quantity}
                </span>
                <Button
                  aria-label={`Increase ${item.name} quantity`}
                  className="size-11 rounded-xl text-slate-600"
                  disabled={isMutating}
                  onClick={() => onIncrease(item.id)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <FiPlus aria-hidden="true" className="size-3.5" />
                </Button>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs font-medium text-slate-500">Line total</p>
              <p className="mt-1 text-base font-semibold tabular-nums tracking-tight text-slate-950">
                {formatCurrency(item.lineTotal)}
              </p>
            </div>
          </div>
          {isUpdating ? (
            <p
              className="mt-3 text-xs font-medium text-brand-700"
              role="status"
            >
              Updating cart…
            </p>
          ) : null}
        </div>
        <Button
          aria-label={`Remove ${item.name} from cart`}
          className="-mr-2 -mt-2 size-11 shrink-0 text-slate-400 hover:bg-red-50 hover:text-red-600"
          disabled={isMutating}
          onClick={() => onRemove(item)}
          size="icon"
          type="button"
          variant="ghost"
        >
          <FiTrash2 aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </article>
  );
}

export default CartItem;
