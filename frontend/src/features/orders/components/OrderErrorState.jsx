import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { Button } from "@/components/ui/button";

function OrderErrorState({ message, onRetry }) {
  return (
    <section
      className="max-w-xl rounded-2xl border border-red-200 bg-white p-6 shadow-sm"
      role="alert"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-700">
        <FiAlertCircle aria-hidden="true" className="size-5" />
      </span>
      <h2 className="mt-4 text-base font-semibold text-slate-950">
        We couldn’t load your orders
      </h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        {message || "Please try again in a moment."}
      </p>
      {onRetry ? (
        <Button
          className="mt-5 gap-2"
          onClick={onRetry}
          type="button"
          variant="outline"
        >
          <FiRefreshCw aria-hidden="true" className="size-4" /> Try again
        </Button>
      ) : null}
    </section>
  );
}

export default OrderErrorState;
