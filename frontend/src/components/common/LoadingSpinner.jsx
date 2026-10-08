import { FiLoader } from "react-icons/fi";
import { cn } from "@/lib/utils";

function LoadingSpinner({ className, label = "Loading" }) {
  return (
    <div className={cn("inline-flex items-center gap-2 text-sm text-slate-600", className)} role="status">
      <FiLoader aria-hidden="true" className="size-4 animate-spin" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
