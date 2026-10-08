import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

function Button({ className, variant, size, type = "button", ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      type={type}
      {...props}
    />
  );
}

export { Button };
