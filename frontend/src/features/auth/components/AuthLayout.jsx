import { FiCheck, FiLock, FiPackage, FiShoppingBag } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/layout/Container";

function AuthLayout({ title, description, children }) {
  return (
    <Container className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] lg:min-h-[570px] lg:grid-cols-[1fr_0.92fr]">
        <section className="relative isolate flex flex-col justify-between overflow-hidden bg-slate-950 px-7 py-9 text-white sm:px-10 sm:py-11 lg:px-12 lg:py-12">
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-28 -z-10 size-80 rounded-full bg-brand-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 -left-32 -z-10 size-96 rounded-full bg-indigo-400/10 blur-3xl"
          />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200">
              <FiShoppingBag
                aria-hidden="true"
                className="size-3.5 text-brand-300"
              />
              A more considered way to shop
            </span>
            <h1 className="mt-8 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              Good things are closer than you think.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              Sign in to keep your cart and purchases together, with a clear
              view of every step.
            </p>
          </div>
          <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:mt-12">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-200">
                <FiLock aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">
                  Private by design
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Secure account sessions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-200">
                <FiPackage aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">
                  Easy to pick up
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Your cart and orders in one place.
                </p>
              </div>
            </div>
          </div>
          <FiCheck
            aria-hidden="true"
            className="absolute bottom-12 right-10 hidden size-24 text-white/[0.04] lg:block"
          />
        </section>

        <section className="flex items-center justify-center px-6 py-9 sm:px-10 sm:py-11 lg:px-12">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardHeader className="px-0 pb-6 pt-0">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                Your account
              </p>
              <CardTitle className="text-2xl tracking-[-0.03em] sm:text-[1.75rem]">
                {title}
              </CardTitle>
              <CardDescription className="mt-1 leading-6">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">{children}</CardContent>
          </Card>
        </section>
      </div>
    </Container>
  );
}

export default AuthLayout;
