import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

function CartItem({ item, isMutating, mutatingItemId, onIncrease, onDecrease, onRemove }) {
  const isUpdating = isMutating && mutatingItemId === item.id;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
          <p className="text-sm text-slate-600">{formatCurrency(item.price)}</p>
        </div>

        <Button
          className="w-full gap-2 sm:w-auto"
          disabled={isUpdating}
          onClick={() => onRemove(item.id)}
          type="button"
          variant="outline"
        >
          <FiTrash2 aria-hidden="true" className="size-4" />
          Remove
        </Button>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Quantity</span>
          <div className="flex items-center overflow-hidden rounded-md border border-slate-200 bg-slate-50">
            <Button
              className="h-10 w-10 rounded-none border-0 bg-transparent px-0 text-slate-700 hover:bg-slate-100"
              disabled={item.quantity <= 1 || isUpdating}
              onClick={() => onDecrease(item.id)}
              type="button"
              variant="ghost"
            >
              <FiMinus aria-hidden="true" className="size-4" />
            </Button>
            <span className="min-w-12 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
            <Button
              className="h-10 w-10 rounded-none border-0 bg-transparent px-0 text-slate-700 hover:bg-slate-100"
              disabled={isUpdating}
              onClick={() => onIncrease(item.id)}
              type="button"
              variant="ghost"
            >
              <FiPlus aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Line total</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{formatCurrency(item.lineTotal)}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
