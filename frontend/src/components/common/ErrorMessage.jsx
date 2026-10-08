import { FiAlertCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";

function ErrorMessage({
  className,
  message = "Something went wrong. Please try again.",
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-900",
        className,
      )}
      role="alert"
    >
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-red-700">
        <FiAlertCircle aria-hidden="true" className="size-4" />
      </span>
      <p className="leading-6">{message}</p>
    </div>
  );
}

export default ErrorMessage;
