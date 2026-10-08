import { FiLoader } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

function Button({
  children,
  className,
  loading = false,
  loadingText,
  disabled,
  variant,
  size,
  type = "button",
  ...props
}) {
  return (
    <button
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? (
        <>
          <FiLoader aria-hidden="true" className="size-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export { Button };
