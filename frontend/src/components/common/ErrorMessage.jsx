import { FiAlertCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";

function ErrorMessage({ className, message = "Something went wrong. Please try again." }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800",
        className,
      )}
      role="alert"
    >
      <FiAlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
