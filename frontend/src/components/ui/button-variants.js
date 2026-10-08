import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-150 motion-safe:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand-600 text-white shadow-sm shadow-brand-600/15 motion-safe:hover:-translate-y-px hover:bg-brand-700 hover:shadow-md",
        secondary: "bg-brand-50 text-brand-700 hover:bg-brand-100",
        outline:
          "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
        destructive:
          "bg-red-600 text-white shadow-sm shadow-red-600/15 motion-safe:hover:-translate-y-px hover:bg-red-700",
      },
      size: {
        default: "h-11 px-4 py-2.5",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
