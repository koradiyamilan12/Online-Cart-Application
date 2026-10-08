import { createElement } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiLock,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button-variants";
import Container from "@/components/layout/Container";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: FiLock,
    title: "Secure by design",
    description:
      "Your account is protected by a private, cookie-based session.",
  },
  {
    icon: FiShoppingBag,
    title: "A cart that's yours",
    description: "Keep the items you choose together in one place.",
  },
  {
    icon: FiPackage,
    title: "Orders, organized",
    description: "Review your purchases and order details whenever you need.",
  },
];

function HomePage() {
  return (
    <Container className="py-7 sm:py-10 lg:py-14">
      <section className="relative isolate overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.045)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-36 -z-10 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(113,100,242,0.13)_0%,rgba(113,100,242,0)_68%)]"
        />
        <div className="grid min-h-[390px] items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-14 lg:py-14">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-600" />A BETTER
              WAY TO SHOP
            </p>
            <h1 className="mt-6 text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-[3.4rem]">
              Find something good.
              <span className="mt-1 block text-brand-700">Make it yours.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Discover the things you need, keep your picks close, and come back
              to every order in one calm, considered space.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group w-full sm:w-auto",
                )}
                to={ROUTES.DASHBOARD}
              >
                Explore the shop
                <FiArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
                to={ROUTES.REGISTER}
              >
                Create an account
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="grid size-5 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                <FiCheck aria-hidden="true" className="size-3" />
              </span>
              Secure sign-in. Your shopping, all in one place.
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative mx-auto flex min-h-[230px] w-full max-w-[430px] items-center justify-center sm:min-h-[300px]"
          >
            <div className="absolute left-[12%] top-[8%] size-32 rounded-full border border-brand-100/80 sm:size-44" />
            <div className="absolute right-[10%] top-[13%] size-20 rounded-full bg-brand-50/80 sm:size-28" />
            <div className="absolute bottom-[7%] left-[21%] h-24 w-44 -rotate-6 rounded-[2rem] bg-slate-100/90 sm:h-32 sm:w-60" />
            <div className="relative grid size-40 place-items-center rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-brand-50 via-white to-brand-100 shadow-[0_25px_60px_rgba(65,57,159,0.13)] sm:size-52 sm:rounded-[3.25rem]">
              <div className="grid size-24 place-items-center rounded-[1.8rem] bg-white text-brand-600 shadow-[0_10px_30px_rgba(65,57,159,0.13)] ring-1 ring-brand-100/80 sm:size-32 sm:rounded-[2.25rem]">
                <FiShoppingBag className="size-11 sm:size-14" />
              </div>
              <span className="absolute -right-4 top-7 grid size-11 place-items-center rounded-2xl border border-slate-100 bg-white text-emerald-600 shadow-md sm:-right-6 sm:top-10 sm:size-14">
                <FiCheck className="size-5 sm:size-6" />
              </span>
              <span className="absolute -bottom-4 -left-8 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs font-semibold text-slate-700 shadow-lg sm:-left-10 sm:px-5 sm:py-3.5">
                Thoughtful, simple, yours
              </span>
            </div>
            <div className="absolute bottom-[18%] right-[10%] size-2 rounded-full bg-brand-400 sm:right-[6%]" />
            <div className="absolute left-[10%] top-[27%] size-1.5 rounded-full bg-slate-300" />
          </div>
        </div>
      </section>

      <section
        aria-label="Shopping features"
        className="grid gap-4 py-10 sm:grid-cols-3 sm:gap-5 sm:py-12"
      >
        {highlights.map((highlight) => (
          <article
            className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white/75 p-5 sm:p-6"
            key={highlight.title}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
              {createElement(highlight.icon, {
                "aria-hidden": true,
                className: "size-[18px]",
              })}
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                {highlight.title}
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                {highlight.description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </Container>
  );
}

export default HomePage;
